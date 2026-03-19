import requests

def test_chat():
    url = "http://localhost:8000/chat"
    payload = {"query": "Tell me about wheat planting."}
    try:
        with requests.post(url, json=payload, stream=True) as r:
            for chunk in r.iter_content(chunk_size=None, decode_unicode=True):
                print(chunk, end='', flush=True)
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    test_chat()
