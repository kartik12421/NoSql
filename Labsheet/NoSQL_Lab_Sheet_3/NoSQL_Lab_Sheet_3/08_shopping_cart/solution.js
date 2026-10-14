// Shopping Cart using Embedded Documents
use("shopping_cart_db");

db.carts.deleteMany({});

db.carts.insertOne({
  userId: "U101",
  items: [
    { productId: "P101", name: "Laptop", price: 65000, quantity: 1 },
    { productId: "P102", name: "Mouse", price: 1200, quantity: 2 }
  ]
});

// Add a product
db.carts.updateOne(
  { userId: "U101" },
  { $push: { items: { productId: "P103", name: "Keyboard", price: 2500, quantity: 1 } } }
);

// Change quantity of Mouse
db.carts.updateOne(
  { userId: "U101", "items.productId": "P102" },
  { $set: { "items.$.quantity": 3 } }
);

// Remove Mouse
db.carts.updateOne(
  { userId: "U101" },
  { $pull: { items: { productId: "P102" } } }
);

// Calculate cart value
db.carts.aggregate([
  { $match: { userId: "U101" } },
  { $unwind: "$items" },
  { $group: {
      _id: "$userId",
      cartValue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
  }}
]);
