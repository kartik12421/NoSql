# Database Distribution Models

## 1. Single Server
Architecture: Application -> One Database Server

Data is stored on one server.
Failure handling: server failure can make the database unavailable.
Advantage: simple to configure.
Limitation: single point of failure and limited scaling.
Application: small applications.

## 2. Sharding
Architecture: Application -> Router -> Shard 1 / Shard 2 / Shard 3

Data is partitioned across multiple shards.
Failure handling depends on whether replicas are configured.
Advantage: horizontal scalability.
Limitation: more complex administration and query routing.
Application: very large datasets.

## 3. Master-Slave / Primary-Secondary Replication
Architecture: Application -> Primary -> Secondary nodes

Data written to the primary is replicated to secondary nodes.
Failure handling: an eligible secondary can be promoted after primary failure.
Advantage: improved availability.
Limitation: replication and failover add operational complexity.
Application: systems needing redundancy.

## 4. Peer-to-Peer Replication
Architecture: Application -> Node A <-> Node B <-> Node C

Nodes operate as peers and data is replicated across nodes.
Failure handling: other replicas can continue serving data.
Advantage: no permanent single master.
Limitation: distributed coordination is more complex.
Application: globally distributed, highly available systems such as Cassandra deployments.

## 5. Sharding + Replication
Architecture:
Application -> Router -> Shard 1 (replicas) + Shard 2 (replicas)

Data is partitioned by shards and each shard has replicas.
Failure handling: a replica can take over when a node fails.
Advantage: scalability plus fault tolerance.
Limitation: highest configuration and operational complexity.
Application: large, highly available applications.
