CREATE KEYSPACE IF NOT EXISTS CollegeDB
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE CollegeDB;

DROP TABLE IF EXISTS Students;

CREATE TABLE Students (
    Student_ID int PRIMARY KEY,
    Name text,
    Course text,
    Semester int,
    Marks int
);

INSERT INTO Students (Student_ID, Name, Course, Semester, Marks)
VALUES (1, 'Amit', 'BCA', 1, 85);

INSERT INTO Students (Student_ID, Name, Course, Semester, Marks)
VALUES (2, 'Neha', 'BCA', 2, 92);

INSERT INTO Students (Student_ID, Name, Course, Semester, Marks)
VALUES (3, 'Rahul', 'MCA', 1, 76);

INSERT INTO Students (Student_ID, Name, Course, Semester, Marks)
VALUES (4, 'Priya', 'BCA', 3, 88);

INSERT INTO Students (Student_ID, Name, Course, Semester, Marks)
VALUES (5, 'Rohan', 'MCA', 2, 81);

SELECT * FROM Students;

SELECT * FROM Students WHERE Course = 'BCA' ALLOW FILTERING;

UPDATE Students SET Marks = 90 WHERE Student_ID = 1;

DELETE FROM Students WHERE Student_ID = 5;
