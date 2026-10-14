"""Q15: Small Neo4j CRUD app using the official Python driver.

Environment variables:
  NEO4J_URI=bolt://localhost:7687
  NEO4J_USER=neo4j
  NEO4J_PASSWORD=your_password
"""
import os
from neo4j import GraphDatabase

URI=os.getenv("NEO4J_URI","bolt://localhost:7687")
USER=os.getenv("NEO4J_USER","neo4j")
PASSWORD=os.getenv("NEO4J_PASSWORD","password")

class StudentApp:
    def __init__(self):
        self.driver=GraphDatabase.driver(URI,auth=(USER,PASSWORD))
    def close(self):
        self.driver.close()
    @staticmethod
    def create(tx, sid, name, city):
        return tx.run("""MERGE (s:Student {id:$id})
                         SET s.name=$name, s.city=$city
                         RETURN s.id AS id, s.name AS name, s.city AS city""",
                      id=sid,name=name,city=city).single().data()
    @staticmethod
    def read(tx, sid):
        record=tx.run("MATCH (s:Student {id:$id}) RETURN s.id AS id, s.name AS name, s.city AS city",id=sid).single()
        return record.data() if record else None
    @staticmethod
    def update(tx, sid, city):
        record=tx.run("MATCH (s:Student {id:$id}) SET s.city=$city RETURN s.id AS id, s.city AS city",
                      id=sid,city=city).single()
        return record.data() if record else None
    @staticmethod
    def delete(tx, sid):
        result=tx.run("MATCH (s:Student {id:$id}) DETACH DELETE s RETURN count(*) AS deleted",id=sid)
        return result.single()["deleted"]
    def run(self):
        with self.driver.session() as session:
            print("CREATE:",session.execute_write(self.create,"CU101","Aman","Chandigarh"))
            print("READ:",session.execute_read(self.read,"CU101"))
            print("UPDATE:",session.execute_write(self.update,"CU101","Delhi"))
            # Example relationship-based query
            session.run("""MERGE (s:Student {id:'CU101'})
                           MERGE (c:Course {id:'NOSQL',name:'NoSQL'})
                           MERGE (s)-[:ENROLLED_IN]->(c)""").consume()
            print("RELATED:",session.run("""MATCH (s:Student {id:'CU101'})-[:ENROLLED_IN]->(c:Course)
                                             RETURN c.name AS course""").data())
            print("DELETE:",session.execute_write(self.delete,"CU101"))
if __name__=="__main__":
    app=StudentApp()
    try: app.run()
    finally: app.close()
