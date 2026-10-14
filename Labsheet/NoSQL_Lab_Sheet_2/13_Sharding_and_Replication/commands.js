// Run these commands on a properly configured MongoDB sharded cluster.

// Enable the database
sh.enableSharding("CollegeDistributed");

// Shard the collection using Student_ID
sh.shardCollection(
  "CollegeDistributed.Students",
  { Student_ID: "hashed" }
);

use("CollegeDistributed");

for (let i = 1; i <= 20; i++) {
  db.Students.insertOne({
    Student_ID: i,
    Name: "Student" + i,
    Course: i % 2 === 0 ? "BCA" : "MCA",
    Marks: 50 + (i % 51)
  });
}

db.Students.countDocuments();
sh.status();
