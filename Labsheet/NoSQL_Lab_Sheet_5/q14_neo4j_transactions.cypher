// Q14: Run these statements in Neo4j Browser. Each submitted query is a transaction.
// Create and update a record
CREATE (p:Product {id:'TX-01', name:'Notebook', stock:10, price:50});
MATCH (p:Product {id:'TX-01'})
SET p.stock = p.stock - 2, p.price = 45
RETURN p;

// Delete the sample record when finished
MATCH (p:Product {id:'TX-01'})
DELETE p;

// Explanation: Neo4j transactions provide atomicity and consistency for the operations
// inside a transaction. In application code, group multiple statements using session.execute_write.
// Availability and scaling depend on deployment topology and configuration.
