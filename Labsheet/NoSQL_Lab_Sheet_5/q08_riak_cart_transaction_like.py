"""Q8: Transaction-like cart workflow. This is NOT an atomic multi-key transaction."""
import json, os, requests
BASE=os.getenv("RIAK_URL","http://localhost:8098").rstrip("/")
H={"Content-Type":"application/json"}
def put(bucket,key,value):
    r=requests.put(f"{BASE}/buckets/{bucket}/keys/{key}",headers=H,data=json.dumps(value),timeout=10); r.raise_for_status()
def get(bucket,key):
    r=requests.get(f"{BASE}/buckets/{bucket}/keys/{key}",timeout=10); r.raise_for_status(); return r.json()
if __name__=="__main__":
    try:
        cart=get("shopping_carts","user-101")
    except requests.RequestException:
        cart={"items":[],"total":0.0}
    cart.setdefault("items",[]).append({"product_id":"P03","quantity":1,"price":250.0})
    cart["total"]=sum(x["quantity"]*x["price"] for x in cart["items"])
    put("shopping_carts","user-101",cart)
    print("Saved cart:",json.dumps(get("shopping_carts","user-101"),indent=2))
    print("Limitation: multiple independent writes are not one ACID transaction; concurrent updates can conflict.")
