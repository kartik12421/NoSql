// Create students
CREATE
(:Student {id: 1, name: 'Amit'}),
(:Student {id: 2, name: 'Neha'}),
(:Student {id: 3, name: 'Rahul'}),
(:Student {id: 4, name: 'Priya'}),
(:Student {id: 5, name: 'Rohan'});

// Create courses
CREATE
(:Course {code: 'BCA', name: 'Bachelor of Computer Applications'}),
(:Course {code: 'MCA', name: 'Master of Computer Applications'}),
(:Course {code: 'BBA', name: 'Bachelor of Business Administration'});

// Create relationships
MATCH (s:Student {id: 1}), (c:Course {code: 'BCA'})
CREATE (s)-[:ENROLLED_IN]->(c);

MATCH (s:Student {id: 2}), (c:Course {code: 'BCA'})
CREATE (s)-[:ENROLLED_IN]->(c);

MATCH (s:Student {id: 3}), (c:Course {code: 'MCA'})
CREATE (s)-[:ENROLLED_IN]->(c);

MATCH (s:Student {id: 4}), (c:Course {code: 'BCA'})
CREATE (s)-[:ENROLLED_IN]->(c);

MATCH (s:Student {id: 5}), (c:Course {code: 'MCA'})
CREATE (s)-[:ENROLLED_IN]->(c);

// 1. Display all students
MATCH (s:Student) RETURN s;

// 2. Students in BCA
MATCH (s:Student)-[:ENROLLED_IN]->(c:Course {code: 'BCA'})
RETURN s;

// 3. Courses taken by Amit
MATCH (s:Student {id: 1})-[:ENROLLED_IN]->(c:Course)
RETURN c;

// 4. Add a relationship
MATCH (s:Student {id: 5}), (c:Course {code: 'BBA'})
CREATE (s)-[:ENROLLED_IN]->(c);

// 5. Remove the relationship
MATCH (s:Student {id: 5})-[r:ENROLLED_IN]->(c:Course {code: 'BBA'})
DELETE r;
