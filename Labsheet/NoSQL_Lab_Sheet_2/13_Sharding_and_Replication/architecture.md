# Sharding + Replication

Conceptual architecture:

Application
    |
    v
MongoDB Router (mongos)
    |
    +-------------------+
    |                   |
    v                   v
  Shard 1             Shard 2
  Primary             Primary
   /   \                /   \
  v     v              v     v
Sec 1  Sec 2          Sec 3  Sec 4

Each shard stores a portion of the data (sharding), while replicas provide redundancy within each shard (replication).

Benefits:
- Sharding provides horizontal scalability.
- Replication provides fault tolerance and availability.
- Together they support large datasets and resilience.
