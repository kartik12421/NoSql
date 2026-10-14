"""Q2: Store and retrieve user sessions in Riak KV."""
import json, os, requests
BASE=os.getenv("RIAK_URL","http://localhost:8098").rstrip("/")
def main():
    session={"session_id":"sess-1001","user_id":"user-42","login_time":"2026-10-10T09:30:00Z","status":"active"}
    url=f"{BASE}/buckets/user_sessions/keys/{session['session_id']}"
    r=requests.put(url,headers={"Content-Type":"application/json"},data=json.dumps(session),timeout=10); r.raise_for_status()
    r=requests.get(url,timeout=10); r.raise_for_status()
    print(json.dumps(r.json(),indent=2))
if __name__=="__main__":
    try: main()
    except requests.RequestException as e: print("Riak request failed:",e)
