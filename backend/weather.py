import requests

# Open-Meteo requires no API key and provides high quality forecasting for free
def get_weather(city: str):
    try:
        # Step 1: Geocoding (City name -> Lat/Lon)
        geo_url = f"https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1&language=en&format=json"
        geo_res = requests.get(geo_url).json()
        
        if not geo_res.get("results"):
            return {"error": f"City '{city}' not found"}
            
        lat = geo_res["results"][0]["latitude"]
        lon = geo_res["results"][0]["longitude"]
        
        # Step 2: Weather Data
        weather_url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m"
        w_res = requests.get(weather_url).json()
        current = w_res["current"]
        
        # Map WMO Weather codes to simplified text conditions
        code = current["weather_code"]
        condition = "Clear"
        if code in [1, 2, 3]: condition = "Cloudy"
        elif code in [45, 48]: condition = "Foggy"
        elif code in [51, 53, 55, 61, 63, 65, 80, 81, 82]: condition = "Rainy"
        elif code in [71, 73, 75, 85, 86]: condition = "Snowy"
        elif code >= 95: condition = "Stormy"
        
        return {
            "temperature": current["temperature_2m"],
            "humidity": current["relative_humidity_2m"],
            "condition": condition,
            "windSpeed": current["wind_speed_10m"]
        }
    except Exception as e:
        return {"error": str(e)}
