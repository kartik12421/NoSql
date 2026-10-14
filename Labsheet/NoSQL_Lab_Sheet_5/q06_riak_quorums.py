"""Q6: Illustrate read/write quorum parameters (if supported by the Riak deployment)."""
import json, os, requests
BASE=os.getenv("RIAK_URL","http://localhost:8098").rstrip("/")
BUCKET="quorum_demo"; KEY="record-1"
if __name__=="__main__":
    url=f"{BASE}/buckets/{BUCKET}/keys/{KEY}?w=2&dw=2"
    try:
        r=requests.put(url,headers={"Content-Type":"application/json"},data=json.dumps({"value":"written with quorum options"}),timeout=10)
        r.raise_for_status()
        r=requests.get(f"{BASE}/buckets/{BUCKET}/keys/{KEY}?r=2",timeout=10); r.raise_for_status()
        print(r.json())
        print("N = replica count; R/W/DW specify read, write and durable-write quorum requirements.")
        print("Larger quorum requirements can improve confidence in a result but may reduce availability.")
    except requests.RequestException as e: print("Request failed; confirm this Riak version supports these parameters:",e)
