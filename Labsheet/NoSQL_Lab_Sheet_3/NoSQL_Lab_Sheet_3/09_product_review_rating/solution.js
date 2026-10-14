// Product Review and Rating System
use("product_reviews_db");

db.reviews.deleteMany({});

db.reviews.insertMany([
  { productId: "P101", customerId: "C101", rating: 5, review: "Excellent product", date: ISODate("2026-10-01") },
  { productId: "P101", customerId: "C102", rating: 4, review: "Very good", date: ISODate("2026-10-02") },
  { productId: "P101", customerId: "C103", rating: 5, review: "Worth buying", date: ISODate("2026-10-03") },
  { productId: "P102", customerId: "C101", rating: 3, review: "Average", date: ISODate("2026-10-04") }
]);

// Average rating and review count for each product
db.reviews.aggregate([
  { $group: {
      _id: "$productId",
      averageRating: { $avg: "$rating" },
      reviewCount: { $sum: 1 }
  }},
  { $sort: { averageRating: -1 } }
]);

// Products with average rating >= 4
db.reviews.aggregate([
  { $group: { _id: "$productId", averageRating: { $avg: "$rating" }, reviewCount: { $sum: 1 } } },
  { $match: { averageRating: { $gte: 4 } } }
]);
