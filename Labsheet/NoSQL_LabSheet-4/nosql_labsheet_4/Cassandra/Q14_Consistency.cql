-- Q14: Replication and consistency levels
-- For a single-node lab, replication_factor=1 is easiest to run. To compare ONE/QUORUM/ALL meaningfully,
-- use a cluster with at least 3 nodes and change replication_factor to 3.
CREATE KEYSPACE IF NOT EXISTS ConsistencyDB
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3};
USE ConsistencyDB;

CREATE TABLE IF NOT EXISTS demo_values (
  item_id int PRIMARY KEY,
  item_value text
);

-- The following CONSISTENCY commands are entered in cqlsh, before the corresponding query.
CONSISTENCY ONE;
INSERT INTO demo_values (item_id, item_value) VALUES (1, 'write at ONE');
SELECT * FROM demo_values WHERE item_id = 1;

CONSISTENCY QUORUM;
UPDATE demo_values SET item_value = 'write at QUORUM' WHERE item_id = 1;
SELECT * FROM demo_values WHERE item_id = 1;

CONSISTENCY ALL;
SELECT * FROM demo_values WHERE item_id = 1;
-- ALL requires all replicas to respond; with RF=3 this may fail if any replica is unavailable.
-- On a single-node cluster, use replication_factor=1; ONE, QUORUM, and ALL then have equivalent replica counts.
