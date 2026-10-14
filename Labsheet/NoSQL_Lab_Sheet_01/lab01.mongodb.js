// NoSQL Database Design - Lab Sheet 01
// Database: StudentDB
// BCA V Semester / I II Years | Session 2026-2027
// Run in MongoDB Shell (mongosh)

// ============================================================
// Q1. Create a new MongoDB database named StudentDB and verify
// ============================================================
const dbName = "StudentDB";
const labDB = db.getSiblingDB(dbName);
print("Current database: " + labDB.getName());

// ============================================================
// Q2. Create Students, Faculty, and Courses collections
// ============================================================
labDB.createCollection("Students");
labDB.createCollection("Faculty");
labDB.createCollection("Courses");
print("Collections:");
printjson(labDB.getCollectionNames());

// ============================================================
// Q3. Insert a single document into Students
// ============================================================
labDB.Students.insertOne({
  rollNo: "CU24260059",
  name: "Vansh Bhardwaj",
  department: "BCA",
  semester: 5,
  cgpa: 8.5
});

// ============================================================
// Q4. Insert multiple student documents
// ============================================================
labDB.Students.insertMany([
  {
    rollNo: "CU24260060",
    name: "Aarav Sharma",
    department: "BCA",
    semester: 5,
    cgpa: 8.2
  },
  {
    rollNo: "CU24260061",
    name: "Ananya Singh",
    department: "BCA",
    semester: 5,
    cgpa: 8.7
  },
  {
    rollNo: "CU24260062",
    name: "Rohan Verma",
    department: "BBA",
    semester: 5,
    cgpa: 7.9
  },
  {
    rollNo: "CU24260063",
    name: "Priya Gupta",
    department: "BCA",
    semester: 5,
    cgpa: 9.0
  }
]);

// ============================================================
// Q5. Retrieve all documents from Students
// ============================================================
print("Q5 - All Students:");
labDB.Students.find().forEach(doc => printjson(doc));

// ============================================================
// Q6. Retrieve a specific student using Roll Number
// ============================================================
print("Q6 - Student CU24260059:");
printjson(labDB.Students.findOne({ rollNo: "CU24260059" }));

// ============================================================
// Q7. Retrieve documents by Department
// ============================================================
print("Q7 - Students in BCA:");
labDB.Students.find({ department: "BCA" }).forEach(doc => printjson(doc));

// ============================================================
// Q8. Display only Name and Department using projection
// ============================================================
print("Q8 - Name and Department:");
labDB.Students.find(
  {},
  { _id: 0, name: 1, department: 1 }
).forEach(doc => printjson(doc));

// ============================================================
// Q9. Update department of a specific student using updateOne()
// ============================================================
labDB.Students.updateOne(
  { rollNo: "CU24260062" },
  { $set: { department: "BCA" } }
);
printjson(labDB.Students.findOne({ rollNo: "CU24260062" }));

// ============================================================
// Q10. Modify semester of all students in a department
// ============================================================
labDB.Students.updateMany(
  { department: "BCA" },
  { $set: { semester: 6 } }
);
print("Q10 - Updated BCA students:");
labDB.Students.find({ department: "BCA" }).forEach(doc => printjson(doc));

// ============================================================
// Q11. Replace an existing student document using replaceOne()
// ============================================================
labDB.Students.replaceOne(
  { rollNo: "CU24260061" },
  {
    rollNo: "CU24260061",
    name: "Ananya Singh",
    department: "BCA",
    semester: 6,
    cgpa: 8.8
  }
);
printjson(labDB.Students.findOne({ rollNo: "CU24260061" }));

// ============================================================
// Q12. Add Email field to all Students
// ============================================================
labDB.Students.updateMany(
  {},
  { $set: { email: "student@example.com" } }
);
print("Q12 - Email field added.");

// ============================================================
// Q13. Remove an existing field from all Students
// ============================================================
// Remove the email field added in Q12.
labDB.Students.updateMany(
  {},
  { $unset: { email: "" } }
);
print("Q13 - Email field removed.");

// ============================================================
// Q14. Delete a specific student using deleteOne()
// ============================================================
labDB.Students.deleteOne({ rollNo: "CU24260063" });
print("Q14 - Student CU24260063 deleted.");

// ============================================================
// Q15. Delete multiple records satisfying a condition
// ============================================================
// Deletes students whose CGPA is below 8.0.
labDB.Students.deleteMany({ cgpa: { $lt: 8.0 } });
print("Q15 - Students with CGPA below 8.0 deleted.");

// ============================================================
// Q16. Count total documents in Students
// ============================================================
print("Q16 - Total Students: " + labDB.Students.countDocuments());

// ============================================================
// Q17. Rename Students collection to StudentDetails
// ============================================================
labDB.Students.renameCollection("StudentDetails");
print("Q17 - Collections after rename:");
printjson(labDB.getCollectionNames());

// ============================================================
// Q18. Create Departments collection and insert sample data
// ============================================================
labDB.createCollection("Departments");
labDB.Departments.insertMany([
  { departmentId: "D01", departmentName: "BCA", head: "Dr. Sharma" },
  { departmentId: "D02", departmentName: "BBA", head: "Dr. Verma" },
  { departmentId: "D03", departmentName: "BCom", head: "Dr. Gupta" }
]);
print("Q18 - Departments:");
labDB.Departments.find().forEach(doc => printjson(doc));

// ============================================================
// Q19. Drop Departments collection and verify deletion
// ============================================================
labDB.Departments.drop();
print("Q19 - Departments exists: " + labDB.getCollectionNames().includes("Departments"));

// ============================================================
// Q20. Drop StudentDB database and confirm collections removed
// ============================================================
// WARNING: The next command permanently deletes StudentDB.
print("Q20 - Database will be dropped.");
labDB.dropDatabase();
print("Q20 - Database dropped.");

// ============================================================
// Q21. Recreate StudentDB and insert sample data
// ============================================================
const recreatedDB = db.getSiblingDB("StudentDB");
recreatedDB.createCollection("Students");
recreatedDB.Students.insertMany([
  {
    rollNo: "CU24260059",
    name: "Vansh Bhardwaj",
    department: "BCA",
    semester: 5,
    cgpa: 8.5
  },
  {
    rollNo: "CU24260060",
    name: "Aarav Sharma",
    department: "BCA",
    semester: 5,
    cgpa: 8.2
  }
]);
print("Q21 - Recreated StudentDB:");
recreatedDB.Students.find().forEach(doc => printjson(doc));

// ============================================================
// Q22. CRUD operations using MongoDB Compass
// ============================================================
// Compass is a GUI tool, so these are the equivalent operations
// to perform manually in MongoDB Compass:
//
// CREATE: Create StudentDB and Students collection.
// READ: Open Students > Documents and view records.
// UPDATE: Edit a document and change a field.
// DELETE: Delete a selected document.
//
// Compare the Compass output with mongosh output.

// ============================================================
// Q23. Demonstrate MongoDB Shell and Compass
// ============================================================
// MongoDB Shell:
// - Database/collection creation
// - Insert, find, update, delete
// - Collection rename/drop
//
// MongoDB Compass:
// - Visual database and collection management
// - Visual document insertion and editing
// - Visual query results
//
// Take screenshots of both tools for the lab record.

// ============================================================
// Q24. MongoDB CRUD vs equivalent SQL operations
// ============================================================
/*
MongoDB                    SQL
---------------------------------------------------------------
insertOne()/insertMany()   INSERT INTO
find()/findOne()           SELECT
updateOne()/updateMany()   UPDATE
deleteOne()/deleteMany()   DELETE

MongoDB stores documents in collections.
SQL databases store rows in tables.

MongoDB has a flexible document schema.
SQL databases generally use a predefined table schema.

MongoDB commonly uses JSON-like BSON documents.
SQL uses tables with rows and columns.
*/

// ============================================================
// Q25. Laboratory report requirements
// ============================================================
/*
Include the following in the final lab report:
1. Objective
2. Software/requirements
3. Commands executed
4. Output of each practical
5. Important screenshots
6. Observations
7. MongoDB Shell vs Compass comparison
8. MongoDB vs SQL comparison
9. Conclusion

Attach screenshots of important practical executions.
*/
