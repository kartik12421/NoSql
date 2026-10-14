// Run on a MongoDB deployment with a config server, mongos and shard servers.
// These commands demonstrate the sharding configuration.

use("admin");

// Enable sharding for the database
sh.enableSharding("ShardDemoDB");

// Choose a shard key and enable sharding on the collection.
// hashed is used here for even distribution.
sh.shardCollection(
  "ShardDemoDB.Students",
  { Student_ID: "hashed" }
);

use("ShardDemoDB");

db.Students.deleteMany({});

for (let i = 1; i <= 20; i++) {
  db.Students.insertOne({
    Student_ID: i,
    Name: "Student" + i,
    Course: i % 2 === 0 ? "BCA" : "MCA",
    Marks: 50 + (i % 51)
  });
}

// Verify data
db.Students.countDocuments();
db.Students.find().limit(20);

// On mongos, inspect distribution
sh.status();
