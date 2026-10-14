// Flexible News Database
use("news_db");

db.news.deleteMany({});

db.news.insertMany([
  {
    title: "AI Summit Held in Delhi",
    author: "News Desk",
    location: "Delhi",
    category: "Technology",
    tags: ["AI", "Technology"],
    images: ["ai-summit.jpg"],
    sources: ["Tech Daily"],
    publishedAt: ISODate("2026-10-01")
  },
  {
    title: "Heavy Rain Expected",
    location: "Haridwar",
    category: "Weather",
    tags: ["Rain", "Weather"],
    sources: ["Local News"],
    publishedAt: ISODate("2026-10-02")
  },
  {
    title: "New Smartphone Released",
    author: "Tech Reporter",
    category: "Technology",
    tags: ["Mobile", "Gadgets"],
    images: ["phone.jpg"],
    publishedAt: ISODate("2026-10-05")
  }
]);

// Search despite different document structures
db.news.find({ category: "Technology" });

db.news.find({ tags: "AI" });

db.news.find({ location: { $exists: true } });

db.news.find({
  $or: [
    { author: /tech/i },
    { tags: "Technology" },
    { category: "Technology" }
  ]
});

// Search articles having images, regardless of other fields
db.news.find({ images: { $exists: true, $ne: [] } });
