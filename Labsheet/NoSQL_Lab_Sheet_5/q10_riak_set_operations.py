"""Q10: Set operations in application logic, persisted as JSON lists in Riak."""
import json, os, requests
BASE=os.getenv("RIAK_URL","http://localhost:8098").rstrip("/")
def save(key,items):
    r=requests.put(f"{BASE}/buckets/user_interests/keys/{key}",headers={"Content-Type":"application/json"},
                   data=json.dumps(sorted(items)),timeout=10); r.raise_for_status()
if __name__=="__main__":
    try:
        a={"music","travel","coding"}; b={"coding","reading","music"}
        a.add("gaming"); a.discard("travel")
        print("coding in A?", "coding" in a)
        print("Common interests:",a & b)
        save("user-A",a); save("user-B",b)
    except requests.RequestException as e: print("Riak request failed:",e)
