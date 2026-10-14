-- Q13: Query-driven event table, partitioned by user and clustered by event time
CREATE KEYSPACE IF NOT EXISTS EventDB
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
USE EventDB;

CREATE TABLE IF NOT EXISTS user_events (
  user_id text,
  event_time timestamp,
  event_id uuid,
  event_type text,
  status text,
  details text,
  PRIMARY KEY ((user_id), event_time, event_id)
) WITH CLUSTERING ORDER BY (event_time DESC, event_id ASC);

INSERT INTO user_events (user_id, event_time, event_id, event_type, status, details)
VALUES ('U101', '2026-10-09T10:00:00Z', uuid(), 'LOGIN', 'SUCCESS', 'Web login');
INSERT INTO user_events (user_id, event_time, event_id, event_type, status, details)
VALUES ('U101', '2026-10-09T10:10:00Z', uuid(), 'VIEW_PAGE', 'SUCCESS', 'Viewed home page');
INSERT INTO user_events (user_id, event_time, event_id, event_type, status, details)
VALUES ('U102', '2026-10-09T10:15:00Z', uuid(), 'PURCHASE', 'PENDING', 'Order 501');

-- Retrieve events for a particular user and time range
SELECT * FROM user_events
WHERE user_id = 'U101'
  AND event_time >= '2026-10-09T09:00:00Z'
  AND event_time < '2026-10-09T11:00:00Z';
