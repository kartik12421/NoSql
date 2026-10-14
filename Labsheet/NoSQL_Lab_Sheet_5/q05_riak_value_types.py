"""Q5: Store strings, JSON documents and lists as values in Riak KV."""
import json, os, requests
BASE=os.getenv("RIAK_URL","http://localhost:8098").rstrip("/")
def put(bucket,key,value):
    r=requests.put(f"{BASE}/buckets/{bucket}/keys/{key}",headers={"Content-Type":"application/json"},
                   data=json.dumps(value),timeout=10); r.raise_for_status()
def get(bucket,key):
    r=requests.get(f"{BASE}/buckets/{bucket}/keys/{key}",timeout=10); r.raise_for_status(); return r.json()
if __name__=="__main__":
    try:
        put("demo_values","greeting","Hello Riak")
        put("demo_values","student",{"id":1,"name":"Aman"})
        put("demo_values","topics",["key-value","NoSQL","distributed"])
        for key in ("greeting","student","topics"): print(key,"=>",get("demo_values",key))
        print("Bucket = collection; key = unique identifier; value = stored data.")
    except requests.RequestException as e: print("Riak request failed:",e)
