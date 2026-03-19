import json
import random
import os

CROPS = [
    "Tomato", "Wheat", "Rice", "Potato", "Onion", 
    "Maize", "Sugarcane", "Cotton", "Soybean", "Mustard", 
    "Gram", "Bajra", "Jowar", "Tur (Arhar)", "Moong", 
    "Urad", "Groundnut", "Garlic", "Cabbage", "Cauliflower",
    "Apple", "Mango", "Banana", "Grapes", "Papaya"
]

DISTRICTS = [
    "Agra", "Aligarh", "Allahabad (Prayagraj)", "Ambedkar Nagar", "Amethi", 
    "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Baghpat", 
    "Bahraich", "Ballia", "Bareilly", "Basti", "Bijnor", 
    "Bulandshahr", "Delhi (Central)", "Delhi (North)", "Delhi (South)", "Delhi (East)",
    "Etawah", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", 
    "Gorakhpur", "Hapur", "Jaunpur", "Jhansi", "Kanpur Nagar", 
    "Lucknow", "Mathura", "Meerut", "Mirzapur", "Moradabad", 
    "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Rae Bareli", "Rampur", 
    "Saharanpur", "Shahjahanpur", "Sitapur", "Varanasi"
]

# Base base price per quintal (₹)
BASE_PRICES = {
    "Tomato": 1800, "Wheat": 2200, "Rice": 3100, "Potato": 1200, "Onion": 1600,
    "Maize": 2000, "Sugarcane": 350,  "Cotton": 6500, "Soybean": 4500, "Mustard": 5200,
    "Gram": 5800, "Bajra": 2400, "Jowar": 2900, "Tur (Arhar)": 9800, "Moong": 8200,
    "Urad": 7400, "Groundnut": 5900, "Garlic": 12000,"Cabbage": 1100, "Cauliflower": 1500,
    "Apple": 8000, "Mango": 4500, "Banana": 2500, "Grapes": 6000, "Papaya": 2000
}

market_data = []

for crop in CROPS:
    base = BASE_PRICES[crop]
    # Pick 10 to 15 random districts for this crop to have active markets
    num_markets = random.randint(10, 15)
    active_districts = random.sample(DISTRICTS, num_markets)
    
    crop_markets = []
    
    for dist in active_districts:
        # +/- 15% regional price variation
        variation = random.uniform(0.85, 1.15)
        price = int(base * variation)
        # Round to nearest 10 for cleaner numbers
        price = round(price / 10) * 10
        crop_markets.append({
            "district": dist,
            "price": price
        })
        
    # Sort by district name alphabetically
    crop_markets.sort(key=lambda x: x["district"])
        
    market_data.append({
        "crop": crop,
        "basePrice": base,
        "markets": crop_markets
    })

# output js string
js_content = f"export const MARKET_DATA = {json.dumps(market_data, indent=2)};\n"
js_content += f"export const CROPS_LIST = {json.dumps(CROPS, indent=2)};\n"

# ensure dir
os.makedirs("c:/Users/kushw/Desktop/19 20/frontend/src/data", exist_ok=True)
output_path = "c:/Users/kushw/Desktop/19 20/frontend/src/data/marketData.js"

with open(output_path, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Generated {len(CROPS)} crops with multi-district market prices at {output_path}")
