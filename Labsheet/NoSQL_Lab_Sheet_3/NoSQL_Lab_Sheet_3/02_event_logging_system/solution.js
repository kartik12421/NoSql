// Event Logging System
use("event_logging_db");

db.events.deleteMany({});

db.events.insertMany([
  { userId: "U101", eventType: "login", ip: "10.0.0.1", timestamp: ISODate("2026-10-08T09:00:00Z") },
  { userId: "U101", eventType: "failed-login", ip: "10.0.0.1", timestamp: ISODate("2026-10-08T09:02:00Z") },
  { userId: "U101", eventType: "failed-login", ip: "10.0.0.1", timestamp: ISODate("2026-10-08T09:03:00Z") },
  { userId: "U101", eventType: "failed-login", ip: "10.0.0.1", timestamp: ISODate("2026-10-08T09:04:00Z") },
  { userId: "U102", eventType: "file-upload", ip: "10.0.0.2", timestamp: ISODate("2026-10-08T10:00:00Z") },
  { userId: "U102", eventType: "logout", ip: "10.0.0.2", timestamp: ISODate("2026-10-08T10:20:00Z") },
  { userId: "U103", eventType: "password-change", ip: "10.0.0.3", timestamp: ISODate("2026-10-08T11:00:00Z") }
]);

// Repeated failed-login attempts per user
db.events.aggregate([
  { $match: { eventType: "failed-login" } },
  { $group: { _id: "$userId", attempts: { $sum: 1 } } },
  { $match: { attempts: { $gte: 3 } } }
]);

// Frequently occurring events
db.events.aggregate([
  { $group: { _id: "$eventType", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);
