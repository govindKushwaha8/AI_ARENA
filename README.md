<<<<<<< HEAD
# AI_ARENA
AI-powered agriculture assistant that provides real-time crop advice, pest control solutions, and smart farming recommendations using AI.
=======
# CropWise GenAI Copilot

A ChatGPT-like agricultural assistant helping farmers with crop advice, fertilizers, pest control, government schemes, and weather insights. Built with React (Frontend) and FastAPI (Backend).

## Features
- **ChatGPT-like Chat Interface:** Supports streaming AI responses and conversational interactions.
- **Multilingual RAG Logic:** Uses FAISS vector database to retrieve agricultural domain knowledge.
- **Microphone / Voice Input:** Utilizes Web Speech API for dictating queries.
- **Top Navbar Integrations:** Real-time weather, market prices, and dynamic Government Schemes Modal.
- **Dynamic Help Center:** FAQs overlay for instantly triggering suggested prompts.

## Project Structure
- `/frontend` - React + Vite frontend via Tailwind CSS and Framer Motion.
- `/backend` - Python FastAPI backend coupled with SQLite and FAISS.

## .env File Structure
Create a `.env` file in the `/backend` directory before running the server:

```env
# /backend/.env
OPENAI_API_KEY="your_openai_api_key_here"  # Optional: Used for the real GPT-3.5 integration. Mocks are provided if absent.
WEATHER_API_KEY="your_openweathermap_api_key" # Replace with real OpenWeather API Key if desired.
```

## Setup Instructions

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the FastAPI Dev Server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
*The backend API will be available at http://localhost:8000.*

### 2. Frontend Setup
1. Open a separate terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite Dev Server:
   ```bash
   npm run dev
   ```
*The React application will be available at http://localhost:5173.*

Go to the browser, open the frontend port, and start utilizing the CropWise Copilot.
>>>>>>> 8e7142a (first commit)
