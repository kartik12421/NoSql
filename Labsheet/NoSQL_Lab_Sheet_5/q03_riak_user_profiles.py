"""Q3: PUT and GET user profiles/preferences in Riak KV."""
import json, os, requests
BASE=os.getenv("RIAK_URL","http://localhost:8098").rstrip("/")
def main():
    profile={"name":"Riya Sharma","email":"riya@example.com","city":"Chandigarh",
             "preferences":{"language":"English","theme":"dark","notifications":True}}
    url=f"{BASE}/buckets/user_profiles/keys/user-101"
    requests.put(url,headers={"Content-Type":"application/json"},data=json.dumps(profile),timeout=10).raise_for_status()
    response=requests.get(url,timeout=10); response.raise_for_status()
    print(json.dumps(response.json(),indent=2))
if __name__=="__main__":
    try: main()
    except requests.RequestException as e: print("Riak request failed:",e)
