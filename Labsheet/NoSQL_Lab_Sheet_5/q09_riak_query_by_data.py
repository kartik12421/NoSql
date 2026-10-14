"""Q9: Query-by-data using application-level filtering over stored user records."""
import json, os, requests
BASE=os.getenv("RIAK_URL","http://localhost:8098").rstrip("/")
USERS=[
 {"id":"u1","name":"Asha","city":"Chandigarh","age":21,"preferences":["music","travel"]},
 {"id":"u2","name":"Kabir","city":"Delhi","age":23,"preferences":["coding","music"]},
 {"id":"u3","name":"Meera","city":"Chandigarh","age":20,"preferences":["reading"]}
]
def main():
    for user in USERS:
        r=requests.put(f"{BASE}/buckets/query_users/keys/{user['id']}",headers={"Content-Type":"application/json"},
                       data=json.dumps(user),timeout=10); r.raise_for_status()
    # For this small demo, filter the local sample list. For real data, use supported indexes/search.
    print("City=Chandigarh:",[u for u in USERS if u["city"]=="Chandigarh"])
    print("Age >= 21:",[u for u in USERS if u["age"]>=21])
    print("Likes music:",[u for u in USERS if "music" in u["preferences"]])
if __name__=="__main__":
    try: main()
    except requests.RequestException as e: print("Riak request failed:",e)
