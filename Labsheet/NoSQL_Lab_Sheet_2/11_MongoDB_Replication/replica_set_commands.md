# MongoDB Primary-Secondary Replication

Start three MongoDB processes using the same replica set name, for example `rs0`.

Example local configuration:

```bash
mongod --replSet rs0 --port 27017 --dbpath ./data/node1
mongod --replSet rs0 --port 27018 --dbpath ./data/node2
mongod --replSet rs0 --port 27019 --dbpath ./data/node3
```

Connect to port 27017 and initialize:

```javascript
rs.initiate({
  _id: "rs0",
  members: [
    {_id: 0, host: "localhost:27017"},
    {_id: 1, host: "localhost:27018"},
    {_id: 2, host: "localhost:27019"}
  ]
});
```

Check status:

```javascript
rs.status();
```

Insert data on the primary:

```javascript
use("ReplicationDB");
db.Students.insertMany([
  {id: 1, name: "Amit"},
  {id: 2, name: "Neha"},
  {id: 3, name: "Rahul"}
]);
```

On a secondary, run:

```javascript
rs.secondaryOk();
db.Students.find();
```

If the primary becomes unavailable, MongoDB can elect an eligible secondary as the new primary.
