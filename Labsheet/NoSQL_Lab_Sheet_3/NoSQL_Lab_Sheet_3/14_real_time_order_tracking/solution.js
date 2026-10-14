// Real-Time Order Tracking System
use("order_tracking_db");

db.orders.deleteMany({});

db.orders.insertOne({
  orderId: "O101",
  customerId: "C101",
  currentStatus: "Delivered",
  statusHistory: [
    { status: "Placed", time: ISODate("2026-10-01T09:00:00Z") },
    { status: "Confirmed", time: ISODate("2026-10-01T09:10:00Z") },
    { status: "Shipped", time: ISODate("2026-10-02T08:00:00Z") },
    { status: "Delivered", time: ISODate("2026-10-03T15:00:00Z") }
  ]
});

// Retrieve current status
db.orders.find(
  { orderId: "O101" },
  { _id: 0, orderId: 1, currentStatus: 1 }
);

// Move order to another stage
db.orders.updateOne(
  { orderId: "O101" },
  {
    $set: { currentStatus: "Delivered" },
    $push: {
      statusHistory: {
        status: "Delivered",
        time: new Date()
      }
    }
  }
);

// Retrieve complete status history
db.orders.find(
  { orderId: "O101" },
  { _id: 0, statusHistory: 1 }
);
