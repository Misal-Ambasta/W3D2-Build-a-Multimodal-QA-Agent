# Backend - Multimodal QA Agent

## Setup
1. Create a virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   ```
2. Copy `env.example` to `.env` and add your Gemini API key.
3. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

## API Endpoints

### `POST /qa`
- **Form fields:**
  - `question` (string, required)
  - `image` (file, optional)
  - `image_url` (string, optional)
- **Response:**
  - `answer` (string)
  - `used_fallback` (boolean)
  - `error` (string, optional)
  - `bounding_boxes` (object, optional)

### `GET /health`
- Returns `{ "status": "ok" }`

## .env Example
```
GEMINI_API_KEY=your_gemini_api_key_here
HOST=0.0.0.0
PORT=8000
DEBUG=True
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
``` 