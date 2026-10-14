// Q11: Student, Course, and Department graph
CREATE CONSTRAINT student_id IF NOT EXISTS FOR (s:Student) REQUIRE s.id IS UNIQUE;
CREATE CONSTRAINT course_id IF NOT EXISTS FOR (c:Course) REQUIRE c.id IS UNIQUE;
CREATE CONSTRAINT department_id IF NOT EXISTS FOR (d:Department) REQUIRE d.id IS UNIQUE;

MERGE (d:Department {id:'BCA', name:'Computer Applications'})
MERGE (c:Course {id:'NOSQL', name:'NoSQL Databases'})
MERGE (s:Student {id:'CU101', name:'Aman'})
MERGE (s)-[:ENROLLED_IN]->(c)
MERGE (c)-[:OFFERED_BY]->(d)
RETURN s,c,d;
