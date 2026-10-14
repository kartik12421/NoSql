// Website Analytics System
use("website_analytics_db");

db.visits.deleteMany({});

db.visits.insertMany([
  { page: "/home", userId: "U1", device: "mobile", browser: "Chrome", location: "Delhi", timestamp: ISODate("2026-10-08T09:00:00Z") },
  { page: "/home", userId: "U2", device: "desktop", browser: "Edge", location: "Haridwar", timestamp: ISODate("2026-10-08T09:10:00Z") },
  { page: "/products", userId: "U1", device: "mobile", browser: "Chrome", location: "Delhi", timestamp: ISODate("2026-10-08T09:20:00Z") },
  { page: "/home", userId: "U3", device: "mobile", browser: "Safari", location: "Roorkee", timestamp: ISODate("2026-10-08T09:30:00Z") },
  { page: "/products", userId: "U4", device: "desktop", browser: "Chrome", location: "Dehradun", timestamp: ISODate("2026-10-08T09:40:00Z") }
]);

// Most visited pages
db.visits.aggregate([
  { $group: { _id: "$page", visits: { $sum: 1 } } },
  { $sort: { visits: -1 } }
]);

// Most commonly used devices
db.visits.aggregate([
  { $group: { _id: "$device", users: { $sum: 1 } } },
  { $sort: { users: -1 } }
]);

// Visits by browser
db.visits.aggregate([
  { $group: { _id: "$browser", visits: { $sum: 1 } } },
  { $sort: { visits: -1 } }
]);
