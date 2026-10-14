// Student Activity Tracking System
use("student_activity_db");

db.students.deleteMany({});

db.students.insertMany([
  {
    name: "Aman Sharma", email: "aman@example.com", semester: 5,
    courses: ["MongoDB", "AI", "Web Development"],
    attendance: { MongoDB: 88, AI: 92, "Web Development": 81 },
    skills: ["Python", "MongoDB", "JavaScript"],
    recentActivities: [
      { type: "assignment", title: "MongoDB Lab", date: ISODate("2026-10-01") },
      { type: "quiz", title: "NoSQL Quiz", date: ISODate("2026-10-05") }
    ]
  },
  {
    name: "Riya Verma", email: "riya@example.com", semester: 5,
    courses: ["MongoDB", "AI"],
    attendance: { MongoDB: 72, AI: 85 },
    skills: ["Python", "ML"],
    recentActivities: [
      { type: "login", title: "LMS Login", date: ISODate("2026-10-06") }
    ]
  }
]);

// Students with MongoDB attendance >= 80
db.students.find({ "attendance.MongoDB": { $gte: 80 } });

// Students having Python skill
db.students.find({ skills: "Python" });

// Students with a recent assignment activity
db.students.find({ "recentActivities.type": "assignment" });

// Students enrolled in both MongoDB and AI
db.students.find({ courses: { $all: ["MongoDB", "AI"] } });
