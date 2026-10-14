use("CollegeDB");
db.Students.insertOne({Student_ID: 6, Name: "Simran", Course: "BCA", Semester: 2, Marks: 89});
db.Students.find({Course: "BCA"});
