import json
import os

STATE_DATA = [
  {
    "state": "Andhra Pradesh",
    "crops": [
      { "month": "June - October", "type": "Kharif", "items": ["Rice", "Cotton", "Groundnut", "Maize"] },
      { "month": "November - April", "type": "Rabi", "items": ["Bengal Gram", "Black Gram", "Tobacco", "Chilies"] },
      { "month": "Year-round", "type": "Cash Crops", "items": ["Sugarcane", "Mangoes", "Papaya", "Turmeric"] }
    ]
  },
  {
    "state": "Assam",
    "crops": [
      { "month": "March - October", "type": "Kharif", "items": ["Ahu Rice", "Tea", "Jute", "Mesta"] },
      { "month": "November - April", "type": "Rabi", "items": ["Mustard", "Potato", "Wheat", "Lentil"] },
      { "month": "Year-round", "type": "Horticulture", "items": ["Bananas", "Pineapple", "Arecanut", "Black Pepper"] }
    ]
  },
  {
    "state": "Bihar",
    "crops": [
      { "month": "June - October", "type": "Kharif", "items": ["Rice", "Maize", "Jute", "Pigeon Pea"] },
      { "month": "November - April", "type": "Rabi", "items": ["Wheat", "Lentil", "Mustard", "Gram"] },
      { "month": "March - June", "type": "Zaid", "items": ["Moong", "Watermelon", "Vegetables", "Makhana"] }
    ]
  },
  {
    "state": "Chhattisgarh",
    "crops": [
      { "month": "June - November", "type": "Kharif", "items": ["Rice", "Soybean", "Maize", "Pigeon Pea"] },
      { "month": "November - March", "type": "Rabi", "items": ["Wheat", "Gram", "Mustard", "Linseed"] },
      { "month": "Support", "type": "Cash Crops", "items": ["Sugarcane", "Papaya", "Banana", "Tomato"] }
    ]
  },
  {
    "state": "Gujarat",
    "crops": [
      { "month": "June - October", "type": "Kharif", "items": ["Cotton", "Groundnut", "Castor", "Bajra"] },
      { "month": "October - March", "type": "Rabi", "items": ["Wheat", "Mustard", "Cumin", "Garlic"] },
      { "month": "Year-round", "type": "Cash Crops", "items": ["Tobacco", "Fennel", "Mango", "Banana"] }
    ]
  },
  {
    "state": "Karnataka",
    "crops": [
      { "month": "June - October", "type": "Kharif", "items": ["Ragi", "Rice", "Tur", "Cotton"] },
      { "month": "October - March", "type": "Rabi", "items": ["Gram", "Wheat", "Safflower", "Jowar"] },
      { "month": "Year-round", "type": "Plantation", "items": ["Coffee", "Arecanut", "Coconut", "Sugarcane"] }
    ]
  },
  {
    "state": "Kerala",
    "crops": [
      { "month": "May - September", "type": "Virippu (Kharif)", "items": ["Paddy", "Tapioca", "Ginger"] },
      { "month": "September - December", "type": "Mundakan (Rabi)", "items": ["Paddy", "Vegetables", "Tubers"] },
      { "month": "Year-round", "type": "Plantation", "items": ["Rubber", "Coconut", "Cardamom", "Black Pepper"] }
    ]
  },
  {
    "state": "Madhya Pradesh",
    "crops": [
      { "month": "June - October", "type": "Kharif", "items": ["Soybean", "Maize", "Urad", "Cotton"] },
      { "month": "October - March", "type": "Rabi", "items": ["Wheat", "Gram (Chana)", "Mustard", "Garlic"] },
      { "month": "Year-round", "type": "Horticulture", "items": ["Onion", "Tomato", "Orange", "Coriander"] }
    ]
  },
  {
    "state": "Maharashtra",
    "crops": [
      { "month": "June - October", "type": "Kharif", "items": ["Cotton", "Soybean", "Pigeon Pea", "Bajra"] },
      { "month": "October - March", "type": "Rabi", "items": ["Jowar", "Gram", "Wheat", "Safflower"] },
      { "month": "Year-round", "type": "Cash Crops", "items": ["Sugarcane", "Grapes", "Onions", "Pomegranates"] }
    ]
  },
  {
    "state": "Odisha",
    "crops": [
      { "month": "June - October", "type": "Kharif", "items": ["Rice", "Jute", "Maize", "Tur"] },
      { "month": "November - April", "type": "Rabi", "items": ["Green Gram", "Mustard", "Groundnut", "Potato"] },
      { "month": "Year-round", "type": "Cash Crops", "items": ["Cashew", "Turmeric", "Coconut", "Rubber"] }
    ]
  },
  {
    "state": "Punjab & Haryana",
    "crops": [
      { "month": "June - October", "type": "Kharif", "items": ["Rice (Paddy)", "Cotton", "Maize", "Sugarcane"] },
      { "month": "November - April", "type": "Rabi", "items": ["Wheat", "Mustard", "Barley", "Gram"] },
      { "month": "March - June", "type": "Zaid", "items": ["Moong", "Sunflower", "Fodder crops", "Kinu"] }
    ]
  },
  {
    "state": "Rajasthan",
    "crops": [
      { "month": "June - October", "type": "Kharif", "items": ["Bajra", "Guar", "Moth Bean", "Sesame"] },
      { "month": "October - March", "type": "Rabi", "items": ["Mustard", "Wheat", "Gram", "Cummin (Jeera)"] },
      { "month": "Year-round", "type": "Cash Crops", "items": ["Isabgol", "Coriander", "Fenugreek", "Garlic"] }
    ]
  },
  {
    "state": "Tamil Nadu",
    "crops": [
      { "month": "June - September", "type": "Kuruvai (Kharif)", "items": ["Rice", "Millets", "Groundnut"] },
      { "month": "October - January", "type": "Samba/Thaladi", "items": ["Rice", "Cotton", "Maize"] },
      { "month": "Year-round", "type": "Plantation", "items": ["Sugarcane", "Banana", "Tea", "Coconut"] }
    ]
  },
  {
    "state": "Telangana",
    "crops": [
      { "month": "June - October", "type": "Kharif", "items": ["Cotton", "Rice", "Maize", "Red Gram"] },
      { "month": "October - March", "type": "Rabi", "items": ["Rice", "Bengal Gram", "Groundnut", "Sorghum"] },
      { "month": "Year-round", "type": "Cash Crops", "items": ["Turmeric", "Chilies", "Mango", "Oil Palm"] }
    ]
  },
  {
    "state": "Uttar Pradesh",
    "crops": [
      { "month": "June - October", "type": "Kharif", "items": ["Rice", "Sugarcane", "Maize", "Bajra"] },
      { "month": "November - April", "type": "Rabi", "items": ["Wheat", "Potato", "Mustard", "Peas"] },
      { "month": "March - June", "type": "Zaid", "items": ["Watermelon", "Muskmelon", "Cucumber", "Moong"] }
    ]
  },
  {
    "state": "West Bengal",
    "crops": [
      { "month": "May - November", "type": "Kharif", "items": ["Aman Rice", "Jute", "Tea"] },
      { "month": "November - March", "type": "Rabi", "items": ["Boro Rice", "Potato", "Mustard", "Wheat"] },
      { "month": "March - June", "type": "Zaid", "items": ["Aus Rice", "Vegetables", "Sesame", "Pineapple"] }
    ]
  }
]

# output js string
js_content = f"export const STATE_DATA = {json.dumps(STATE_DATA, indent=2)};\n"

# ensure dir
os.makedirs("c:/Users/kushw/Desktop/19 20/frontend/src/data", exist_ok=True)
output_path = "c:/Users/kushw/Desktop/19 20/frontend/src/data/stateData.js"

with open(output_path, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Generated {len(STATE_DATA)} state profiles at {output_path}")
