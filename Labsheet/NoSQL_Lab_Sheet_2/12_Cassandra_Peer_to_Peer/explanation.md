# Peer-to-Peer Replication

Cassandra uses a peer-to-peer architecture. Nodes are generally equal and can coordinate requests without a single permanent master.

With a replication factor of 3, copies of partition data are stored on multiple nodes according to the partitioning strategy.

Compared with master-slave replication:
- Master-slave has a primary/master that coordinates writes and secondaries replicate from it.
- Cassandra distributes responsibility across peer nodes.
- Cassandra is designed for high availability and horizontal scaling.
