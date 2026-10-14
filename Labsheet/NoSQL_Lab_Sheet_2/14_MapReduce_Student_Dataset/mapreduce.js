use("CollegeDB");

db.CourseStudents.drop();

db.CourseStudents.insertMany([
  { Student_ID: 1, Name: "Amit", Course: "BCA", Marks: 85 },
  { Student_ID: 2, Name: "Neha", Course: "BCA", Marks: 92 },
  { Student_ID: 3, Name: "Rahul", Course: "MCA", Marks: 76 },
  { Student_ID: 4, Name: "Priya", Course: "BCA", Marks: 88 },
  { Student_ID: 5, Name: "Rohan", Course: "MCA", Marks: 81 },
  { Student_ID: 6, Name: "Simran", Course: "MCA", Marks: 89 }
]);

// Map: emit course -> marks
var mapFunction = function () {
  emit(this.Course, this.Marks);
};

// Reduce: calculate count and sum
var reduceFunction = function (course, marks) {
  return {
    count: marks.length,
    sum: marks.reduce((a, b) => a + b, 0)
  };
};

db.CourseStudents.mapReduce(
  mapFunction,
  reduceFunction,
  {
    out: "CourseStats"
  }
);

db.CourseStats.find().forEach(function (doc) {
  print(
    doc._id +
    " -> Count: " + doc.value.count +
    ", Average: " + (doc.value.sum / doc.value.count)
  );
});
