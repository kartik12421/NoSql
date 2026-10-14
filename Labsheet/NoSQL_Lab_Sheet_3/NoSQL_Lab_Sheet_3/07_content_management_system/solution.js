// Content Management System
use("cms_db");

db.articles.deleteMany({});

db.articles.insertMany([
  {
    title: "MongoDB Basics",
    author: "Yash Anand",
    category: "Database",
    tags: ["MongoDB", "NoSQL"],
    status: "published",
    publishedAt: ISODate("2026-10-01")
  },
  {
    title: "Future of AI",
    author: "Riya Verma",
    category: "AI",
    tags: ["AI", "ML"],
    status: "draft",
    publishedAt: null
  },
  {
    title: "Web Development Guide",
    author: "Aman Sharma",
    category: "Web",
    tags: ["HTML", "CSS", "JavaScript"],
    status: "published",
    publishedAt: ISODate("2026-10-04")
  }
]);

// Published articles
db.articles.find({ status: "published" });

// Unpublished articles
db.articles.find({ status: { $ne: "published" } });

// Published AI articles
db.articles.find({ category: "AI", status: "published" });

// Articles containing MongoDB tag
db.articles.find({ tags: "MongoDB" });
