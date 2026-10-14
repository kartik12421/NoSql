// User Notification System
use("notifications_db");

db.notifications.deleteMany({});

db.notifications.insertMany([
  { userId: "U101", type: "message", title: "New Message", message: "You received a message.", read: false, createdAt: ISODate("2026-10-08T09:00:00Z") },
  { userId: "U101", type: "order-update", title: "Order Shipped", message: "Your order has been shipped.", read: false, createdAt: ISODate("2026-10-08T09:30:00Z") },
  { userId: "U101", type: "system-alert", title: "Security Alert", message: "New login detected.", read: true, createdAt: ISODate("2026-10-08T10:00:00Z") }
]);

// Retrieve unread notifications
db.notifications.find({ userId: "U101", read: false }).sort({ createdAt: -1 });

// Mark one notification as read
db.notifications.updateOne(
  { userId: "U101", title: "New Message" },
  { $set: { read: true, readAt: new Date() } }
);

// Mark all unread notifications as read
db.notifications.updateMany(
  { userId: "U101", read: false },
  { $set: { read: true, readAt: new Date() } }
);
