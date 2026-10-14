"""Q7: Insert many records across logical buckets; physical distribution requires a Riak cluster."""
import json, os, requests
BASE=os.getenv("RIAK_URL","http://localhost:8098").rstrip("/")
def main(count=100):
    for bucket in ("scale_students","scale_products","scale_events"):
        for i in range(count):
            data={"id":i,"bucket":bucket,"message":f"sample-{i}"}
            r=requests.put(f"{BASE}/buckets/{bucket}/keys/{i}",headers={"Content-Type":"application/json"},
                           data=json.dumps(data),timeout=10); r.raise_for_status()
        print(f"Inserted {count} records into {bucket}")
    print("Riak distributes partitions/replicas across cluster nodes; add nodes and rebalance to scale horizontally.")
if __name__=="__main__":
    try: main(int(os.getenv("RECORD_COUNT","100")))
    except requests.RequestException as e: print("Riak request failed:",e)
