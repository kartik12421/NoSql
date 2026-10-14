"""Q4: Shopping cart CRUD; each user's cart is one JSON value."""
import json, os, requests
BASE=os.getenv("RIAK_URL","http://localhost:8098").rstrip("/")
URL=f"{BASE}/buckets/shopping_carts/keys/user-101"
H={"Content-Type":"application/json"}
def save(cart):
    r=requests.put(URL,headers=H,data=json.dumps(cart),timeout=10); r.raise_for_status()
def load():
    r=requests.get(URL,timeout=10); r.raise_for_status(); return r.json()
def main():
    cart={"items":[{"product_id":"P01","quantity":2,"price":199.0}]}
    save(cart)                                   # create
    cart=load(); cart["items"].append({"product_id":"P02","quantity":1,"price":499.0}); save(cart) # add
    cart=load(); cart["items"][0]["quantity"]=3; save(cart) # update quantity
    print("Current cart:",json.dumps(load(),indent=2))
    cart=load(); cart["items"]=[x for x in cart["items"] if x["product_id"]!="P02"]; save(cart) # remove
    print("After removal:",json.dumps(load(),indent=2))
if __name__=="__main__":
    try: main()
    except requests.RequestException as e: print("Riak request failed:",e)
