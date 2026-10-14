-- Q11: Keyspace and Students table
CREATE KEYSPACE IF NOT EXISTS CollegeDB
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE CollegeDB;

CREATE TABLE IF NOT EXISTS Students (
  student_id int PRIMARY KEY,
  name text,
  email text,
  course text,
  year int
);

INSERT INTO Students (student_id, name, email, course, year) VALUES (1, 'Aarav Sharma', 'aarav@example.com', 'BCA', 1);
INSERT INTO Students (student_id, name, email, course, year) VALUES (2, 'Diya Verma', 'diya@example.com', 'BCA', 2);
INSERT INTO Students (student_id, name, email, course, year) VALUES (3, 'Kabir Singh', 'kabir@example.com', 'BSc', 1);
INSERT INTO Students (student_id, name, email, course, year) VALUES (4, 'Meera Gupta', 'meera@example.com', 'BCA', 3);
INSERT INTO Students (student_id, name, email, course, year) VALUES (5, 'Ishaan Patel', 'ishaan@example.com', 'BCom', 2);

SELECT * FROM Students;
SELECT * FROM Students WHERE student_id = 3;
