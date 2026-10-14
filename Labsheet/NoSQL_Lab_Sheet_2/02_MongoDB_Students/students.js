use("CollegeDB");

db.Students.drop();

db.Students.insertMany([
  { Student_ID: 1, Name: "Amit", Course: "BCA", Semester: 1, Marks: 85 },
  { Student_ID: 2, Name: "Neha", Course: "BCA", Semester: 2, Marks: 92 },
  { Student_ID: 3, Name: "Rahul", Course: "MCA", Semester: 1, Marks: 76 },
  { Student_ID: 4, Name: "Priya", Course: "BCA", Semester: 3, Marks: 88 },
  { Student_ID: 5, Name: "Rohan", Course: "MCA", Semester: 2, Marks: 81 }
]);

// 1. Display all
db.Students.find();

// 2. Find students from BCA
db.Students.find({ Course: "BCA" });

// 3. Update marks of student 1
db.Students.updateOne(
  { Student_ID: 1 },
  { $set: { Marks: 90 } }
);

// 4. Delete student 5
db.Students.deleteOne({ Student_ID: 5 });

// 5. Count students
db.Students.countDocuments();
