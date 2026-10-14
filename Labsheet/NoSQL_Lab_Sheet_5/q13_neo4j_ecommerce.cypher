// Q13: E-commerce graph
MERGE (customer:Customer {id:'C01', name:'Riya'})
MERGE (category:Category {name:'Electronics'})
MERGE (p1:Product {id:'P01', name:'Headphones', price:999})
MERGE (p2:Product {id:'P02', name:'Keyboard', price:1499})
MERGE (order:Order {id:'O01', date:'2026-10-10'})
MERGE (customer)-[:PLACED]->(order)
MERGE (order)-[:CONTAINS {quantity:1}]->(p1)
MERGE (order)-[:CONTAINS {quantity:1}]->(p2)
MERGE (p1)-[:IN_CATEGORY]->(category)
MERGE (p2)-[:IN_CATEGORY]->(category);

// Products purchased by Riya
MATCH (:Customer {name:'Riya'})-[:PLACED]->(:Order)-[line:CONTAINS]->(p:Product)
RETURN p.name AS product, line.quantity AS quantity, p.price AS price;
