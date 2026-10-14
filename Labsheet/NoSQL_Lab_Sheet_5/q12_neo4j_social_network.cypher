// Q12: Social network and friend/follower queries
MERGE (a:Person {name:'Asha'})
MERGE (b:Person {name:'Kabir'})
MERGE (c:Person {name:'Meera'})
MERGE (org:Company {name:'TechWorks'})
MERGE (a)-[:FRIENDS_WITH]->(b)
MERGE (c)-[:FOLLOWS]->(a)
MERGE (b)-[:WORKS_AT]->(org);

// Find Asha's friends
MATCH (:Person {name:'Asha'})-[:FRIENDS_WITH]-(friend:Person)
RETURN DISTINCT friend.name AS friend;

// Find Asha's followers
MATCH (follower:Person)-[:FOLLOWS]->(:Person {name:'Asha'})
RETURN follower.name AS follower;
