CREATE (s:Student {id: 6, name: 'Simran'})
MATCH (s:Student {id: 6}), (c:Course {code: 'BCA'})
CREATE (s)-[:ENROLLED_IN]->(c);
