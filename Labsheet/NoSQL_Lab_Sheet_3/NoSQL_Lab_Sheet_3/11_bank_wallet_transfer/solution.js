// Bank Wallet Transfer using MongoDB Transaction
// IMPORTANT: Transactions require MongoDB Atlas or a replica-set deployment.
use("bank_wallet_db");

db.wallets.deleteMany({});

db.wallets.insertMany([
  { userId: "U101", name: "Aman", balance: 10000 },
  { userId: "U102", name: "Riya", balance: 5000 }
]);

const session = db.getMongo().startSession();
const walletDb = session.getDatabase("bank_wallet_db");

try {
  session.startTransaction();

  const amount = 1500;

  const sender = walletDb.wallets.findOne({ userId: "U101" });
  if (!sender || sender.balance < amount) {
    throw new Error("Insufficient balance");
  }

  walletDb.wallets.updateOne(
    { userId: "U101" },
    { $inc: { balance: -amount } }
  );

  walletDb.wallets.updateOne(
    { userId: "U102" },
    { $inc: { balance: amount } }
  );

  session.commitTransaction();
  print("Transfer completed successfully.");
} catch (error) {
  session.abortTransaction();
  print("Transfer failed: " + error.message);
} finally {
  session.endSession();
}

db.wallets.find();
