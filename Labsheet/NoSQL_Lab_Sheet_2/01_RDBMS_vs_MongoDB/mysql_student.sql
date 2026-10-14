CREATE DATABASE IF NOT EXISTS CollegeDB;
USE CollegeDB;

DROP TABLE IF EXISTS Student;

CREATE TABLE Student (
    Student_ID INT PRIMARY KEY,
    Name VARCHAR(50),
    Course VARCHAR(20),
    Semester INT,
    Marks INT
);

INSERT INTO Student VALUES
(1, 'Amit', 'BCA', 1, 85),
(2, 'Neha', 'BCA', 2, 92),
(3, 'Rahul', 'MCA', 1, 76),
(4, 'Priya', 'BCA', 3, 88),
(5, 'Rohan', 'MCA', 2, 81);

SELECT * FROM Student;
