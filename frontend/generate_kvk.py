import json
import random

up_districts = [
    "Agra", "Aligarh", "Prayagraj", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya",
    "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly",
    "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria",
    "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad",
    "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur",
    "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar",
    "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur",
    "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Raebareli", "Rampur", "Saharanpur",
    "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur",
    "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
] # 75 UP Districts

delhi_districts = [
    "Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", 
    "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"
] # 11 Delhi Districts

# Total 86 districts. We will add 14 generic ones or duplicates for large districts (e.g. KVK - Lucknow II) to make exactly 100.
districts = up_districts + delhi_districts
extra_districts = [
    "Agra II", "Aligarh II", "Prayagraj II", "Bareilly II", "Gorakhpur II", "Kanpur Nagar II",
    "Lucknow II", "Meerut II", "Moradabad II", "Varanasi II", "Ghaziabad II", "Gautam Buddha Nagar II",
    "New Delhi II", "South Delhi II"
]
all_districts = districts + extra_districts # exactly 100

officers = ["Dr. Sharma", "Dr. Singh", "Dr. Patel", "Dr. Reddy", "Dr. Kumar", "Dr. Verma", "Dr. Yadav", "Dr. Gupta", "Dr. Mishra", "Dr. Tiwari", "Dr. Kushwaha", "Dr. Pandey", "Dr. Srivastava", "Dr. Chauhan", "Dr. Thakur"]
specialties = ["Soil Testing", "Pest Management", "Seed Distribution", "Irrigation Advice", "Crop Protection", "Horticulture", "Organic Farming", "Weather Advisory"]

kvk_data = []

# determinism so it doesn't change randomly every build
random.seed(42)

for i, dist in enumerate(all_districts):
    state = "Delhi" if dist in delhi_districts or dist in ["New Delhi II", "South Delhi II"] else "Uttar Pradesh"
    
    kvk = {
        "id": i,
        "name": f"Krishi Vigyan Kendra (KVK) - {dist}",
        "state": state,
        "officer": random.choice(officers),
        "phone": f"+91 98{random.randint(10000000, 99999999)}",
        "specialty": random.choice(specialties),
        "distance": f"{(random.random() * 80 + 2):.1f} km"
    }
    kvk_data.append(kvk)

# Write to JS file
js_content = f"export const MOCK_HELP_CENTERS = {json.dumps(kvk_data, indent=2)};\n"
js_content += f"export const DISTRICTS = {json.dumps(all_districts, indent=2)};\n"
import os
os.makedirs("c:/Users/kushw/Desktop/19 20/frontend/src/data", exist_ok=True)
with open("c:/Users/kushw/Desktop/19 20/frontend/src/data/kvkData.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print("Generated kvkData.js successfully with 100 entries.")
