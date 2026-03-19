import requests

city = "Prayagraj"
geo_url = f"https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1&language=en&format=json"

try:
    geo_res = requests.get(geo_url).json()
    if not geo_res.get("results"):
        print("ERR: City not found")
        exit()
        
    lat = geo_res["results"][0]["latitude"]
    lon = geo_res["results"][0]["longitude"]
    
    weather_url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m"
    w_res = requests.get(weather_url).json()
    print("WEATHER:", w_res["current"])
except Exception as e:
    print("ERR:", e)
