-- Run on a Cassandra cluster with multiple nodes.

CREATE KEYSPACE IF NOT EXISTS CollegeP2P
WITH replication = {
  'class': 'NetworkTopologyStrategy',
  'datacenter1': 3
};

USE CollegeP2P;

CREATE TABLE IF NOT EXISTS Students (
  Student_ID int PRIMARY KEY,
  Name text,
  Course text,
  Marks int
);

INSERT INTO Students (Student_ID, Name, Course, Marks)
VALUES (1, 'Amit', 'BCA', 85);

INSERT INTO Students (Student_ID, Name, Course, Marks)
VALUES (2, 'Neha', 'BCA', 92);

SELECT * FROM Students;
