from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import StreamingResponse

from db import init_db, insert_feedback
from weather import get_weather
from rag import generate_response_stream

app = FastAPI(title="CropWise GenAI Copilot")

# Avoid CORS issues when calling from React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    init_db()

class QueryRequest(BaseModel):
    query: str

class FeedbackRequest(BaseModel):
    rating: int
    message: str

@app.post("/chat")
async def chat_endpoint(req: QueryRequest):
    return StreamingResponse(generate_response_stream(req.query), media_type="text/plain")

@app.get("/weather")
def weather_endpoint(city: str):
    return get_weather(city)

@app.post("/feedback")
def feedback_endpoint(req: FeedbackRequest):
    insert_feedback(req.rating, req.message)
    return {"status": "success"}

@app.get("/schemes")
def schemes_endpoint():
    return [
      {
        "name": "PM-KISAN",
        "benefit": "₹6000 per year",
        "eligibility": "All farmers"
      },
      {
        "name": "Soil Health Card",
        "benefit": "Soil quality analysis",
        "eligibility": "All farmers"
      },
      {
        "name": "Pradhan Mantri Fasal Bima Yojana",
        "benefit": "Crop insurance against natural calamities",
        "eligibility": "All farmers growing notified crops"
      },
      {
        "name": "Kisan Credit Card (KCC)",
        "benefit": "Short term credit / loan limits",
        "eligibility": "Farmers, Tenant farmers, Sharecroppers"
      }
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
