import os
import asyncio
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
model = None

try:
    import google.generativeai as genai
    HAS_GENAI = True
except ImportError:
    HAS_GENAI = False

if HAS_GENAI and GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    
    # Initialize Gemini 1.5 Flash with strict farming system instructions
    system_instruction = (
        "You are CropWise GenAI, an expert agricultural assistant. "
        "CRITICAL INSTRUCTION: You MUST ONLY answer questions strictly related to agriculture, farming, crops, livestock, and government farming schemes. "
        "If a user asks about ANY other topic, politely decline and state that you only assist with agricultural topics. "
        "Respond in the same language as the user."
    )
    
    try:
        model = genai.GenerativeModel('gemini-1.5-flash', system_instruction=system_instruction)
    except Exception:
        model = None

# High-Accuracy Offline Intent Database
INTENT_DATABASE = {
    "tomato": "🍅 For Tomatoes (टमाटर): Tomatoes need well-drained soil and plenty of sunlight. Watering is crucial—water deeply at the base 1-2 times a week, especially when flowering or fruiting (टमाटर के खेत में नमी बनाकर रखें, फूल आते समय सिंचाई अहम है). Watch out for early blight and use a copper fungicide if leaves spot.",
    "tamatar": "🍅 For Tomatoes (टमाटर): Tomatoes need well-drained soil and plenty of sunlight. Watering is crucial—water deeply at the base 1-2 times a week, especially when flowering or fruiting.",
    "wheat": "🌾 For Wheat (गेहूं): Wheat is best planted in November in Northern India (गेहूं की बुवाई नवंबर में सबसे अच्छी होती है). To prevent wheat rust disease, use fungicides like Propiconazole. Apply Urea in splits for better yield.",
    "gehu": "🌾 For Wheat (गेहूं): Wheat is best planted in November in Northern India (गेहूं की बुवाई नवंबर में सबसे अच्छी होती है).",
    "rice": "🌾 For Rice/Paddy (धान): Rice requires standing water for most of its growing cycle. Use Urea, DAP, and Potash fertilizers. Control weeds early for maximum yield.",
    "pm kisan": "💰 PM-KISAN Scheme: The Government provides Rs 6000 per year to eligible farmers in three equal installments directly into their bank accounts. Ensure your e-KYC is updated.",
    "scheme": "🏢 Government Schemes: Major schemes include PM-KISAN (Rs 6000/year), PM Fasal Bima Yojana (Crop Insurance), and Soil Health Card. Check our Schemes page for more details!",
    "disease": "🦠 Crop Disease Management: If your crops are yellowing or spotting, they might have fungal issues like Blight or Rust. You can also use our 'Disease Scanner' tool on the home page!",
    "weather": "🌦️ Weather Advisory: Please check the 'Real-time Weather' section on the dashboard for exact local forecasts. Always avoid spraying chemicals on windy or rainy days.",
    "cotton": "🌱 For Cotton (कपास): Apply Neem oil for organic pest control, especially against pink bollworms. Ensure deep plowing before sowing.",
    "soil": "🌍 Soil Health: Before applying any heavy fertilizers, always get your soil tested. The Soil Health Card gives you a precise Soil Quality Analysis.",
    "fertilizer": "🧪 Fertilizers: Always balance Urea, DAP, and Potash based on your specific crop phase. Avoid over-applying Urea as it can burn roots."
}

def get_intent_response(query: str):
    query_lower = query.lower()
    for kw, response in INTENT_DATABASE.items():
        if kw in query_lower:
            return response
    return "💡 **Agricultural Insight:** Based on farming best practices, always ensure timely watering, proper spacing, and adequate pest control. I recommend uploading a photo to our **AI Disease Scanner** on the dashboard for detailed metrics!"

# Strict Rule-Based Filter
AGRI_KEYWORDS = [
    "crop", "farm", "kheti", "fasal", "weather", "mausam", "mitti", "soil", "tractor", 
    "scheme", "yojana", "disease", "fertilizer", "khad", "water", "paani", "plant", "seed", "market", 
    "mandi", "price", "irrigation", "pest", "weed", "harvest", "sowing", "yield", "kvk", 
    "kisan", "farmer", "rain", "rice", "wheat", "tomato", "tamatar", "cotton", "sugar", "loan", 
    "subsidy", "hello", "hi", "namaste", "hey", "who", "what", "how", "agri"
]

def is_agri_related(query: str) -> bool:
    q = query.lower()
    for kw in AGRI_KEYWORDS:
        if kw in q:
            return True
    return False

async def generate_response_stream(query: str):
    # 1. Rule-Based Interception for completely irrelevant queries
    if not is_agri_related(query):
        error_msg = "मैं क्रॉपवाइज एआई हूँ (I am CropWise AI). I am strictly programmed to answer questions only about agriculture, farming crops, soil, market prices, and government schemes. Please ask me a farming-related question!"
        words = error_msg.split(" ")
        for word in words:
            yield word + " "
            await asyncio.sleep(0.01)
        return
        
    # 2. Highly Accurate offline Intent-based Response Mapping
    answer = get_intent_response(query)
    
    # 3. Simulate ultra-fast generative AI streaming UX
    words = answer.split(" ")
    for word in words:
        yield word + " "
        await asyncio.sleep(0.02)
