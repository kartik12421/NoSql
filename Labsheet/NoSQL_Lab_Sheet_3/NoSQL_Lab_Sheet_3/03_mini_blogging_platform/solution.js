// Mini Blogging Platform
use("blog_db");

db.blogs.deleteMany({});

db.blogs.insertMany([
  {
    title: "Learning MongoDB",
    author: "Yash Anand",
    category: "Database",
    tags: ["MongoDB", "NoSQL", "Backend"],
    comments: [
      { user: "Aman", text: "Very useful!", date: ISODate("2026-10-01") }
    ],
    publishedAt: ISODate("2026-10-02"),
    published: true
  },
  {
    title: "Getting Started with AI",
    author: "Riya Verma",
    category: "AI",
    tags: ["AI", "Machine Learning", "Python"],
    comments: [],
    publishedAt: ISODate("2026-10-05"),
    published: true
  }
]);

// Blogs containing MongoDB tag
db.blogs.find({ tags: "MongoDB" });

// Blogs in Database category with NoSQL tag
db.blogs.find({ category: "Database", tags: "NoSQL" });

// Blogs having either AI or Python tag
db.blogs.find({ tags: { $in: ["AI", "Python"] } });

// Blogs containing both AI and Machine Learning tags
db.blogs.find({ tags: { $all: ["AI", "Machine Learning"] } });
