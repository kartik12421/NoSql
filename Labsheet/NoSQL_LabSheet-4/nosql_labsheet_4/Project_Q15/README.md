# Q15 Project: Content Management System using HBase

This mini-project demonstrates table creation, insertion, retrieval, updating, and deletion. Run `CMS_HBase.hbase` in the HBase shell.

## Design notes
- `content` stores title and body.
- `author` stores author ID and display name.
- `metadata` stores status and update date.
- Row key `POST#<id>` enables direct retrieval of one post.
- HBase provides row-level atomic operations, not general multi-row ACID transactions. Design row keys around access patterns and avoid monotonically increasing keys for heavy write workloads.
- Replication and multiple RegionServers can support availability and horizontal scale. Actual behavior depends on cluster configuration.
