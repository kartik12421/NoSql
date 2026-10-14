"""Q1: Basic CRUD operations for student records in Riak KV."""
import json, os, requests
BASE = os.getenv("RIAK_URL", "http://localhost:8098").rstrip("/")
BUCKET = "students"
HEADERS = {"Content-Type": "application/json"}

def put(key, value):
    r = requests.put(f"{BASE}/buckets/{BUCKET}/keys/{key}", headers=HEADERS,
                     data=json.dumps(value), timeout=10)
    r.raise_for_status()

def get(key):
    r = requests.get(f"{BASE}/buckets/{BUCKET}/keys/{key}", timeout=10)
    r.raise_for_status()
    return r.json()

def delete(key):
    r = requests.delete(f"{BASE}/buckets/{BUCKET}/keys/{key}", timeout=10)
    r.raise_for_status()

if __name__ == "__main__":
    try:
        put("CU101", {"name": "Aman", "course": "BCA", "semester": 3})
        print("Stored:", get("CU101"))
        put("CU101", {"name": "Aman Kumar", "course": "BCA", "semester": 4})
        print("Updated:", get("CU101"))
        delete("CU101")
        print("Deleted CU101")
    except requests.RequestException as e:
        print("Riak request failed. Check that Riak HTTP API is running:", e)
