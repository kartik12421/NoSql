// Course Learning Platform
use("course_learning_db");

db.students.deleteMany({});

db.students.insertMany([
  {
    studentId: "S101", name: "Aman",
    courses: [
      { courseId: "C101", course: "MongoDB", progress: 85, completed: false },
      { courseId: "C102", course: "AI", progress: 100, completed: true }
    ]
  },
  {
    studentId: "S102", name: "Riya",
    courses: [
      { courseId: "C101", course: "MongoDB", progress: 55, completed: false }
    ]
  },
  {
    studentId: "S103", name: "Karan",
    courses: [
      { courseId: "C101", course: "MongoDB", progress: 95, completed: true }
    ]
  }
]);

// Students with MongoDB progress >= 80%
db.students.find({
  courses: { $elemMatch: { courseId: "C101", progress: { $gte: 80 } } }
});

// Students who completed any course
db.students.find({ "courses.completed": true });

// Students with progress between 50% and 90% in MongoDB
db.students.find({
  courses: { $elemMatch: { courseId: "C101", progress: { $gte: 50, $lte: 90 } } }
});
