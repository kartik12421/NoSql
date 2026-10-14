// Start MongoDB locally first.
// Example service command depends on your OS installation.
//
// mongosh

use("SingleServerDB");

db.Students.drop();

db.Students.insertMany([
  {id: 1, name: "Amit", course: "BCA"},
  {id: 2, name: "Neha", course: "BCA"},
  {id: 3, name: "Rahul", course: "MCA"}
]);

// CREATE / READ
db.Students.find();

// UPDATE
db.Students.updateOne(
  {id: 1},
  {$set: {course: "BCA-Hons"}}
);

// DELETE
db.Students.deleteOne({id: 3});

// Verify
db.Students.find();
