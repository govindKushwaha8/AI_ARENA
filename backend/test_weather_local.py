import requests

url = "http://localhost:8000/weather?city=Kanpur"
try:
    res = requests.get(url)
    print("STATUS:", res.status_code)
    print("JSON:", res.json())
except Exception as e:
    print("ERR:", e)
