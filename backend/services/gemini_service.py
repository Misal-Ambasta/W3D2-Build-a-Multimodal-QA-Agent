import os
from google import genai
from typing import Optional
from PIL import Image
import requests
from io import BytesIO
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
if not api_key:
    raise RuntimeError("No Gemini API key found in environment. Set GOOGLE_API_KEY or GEMINI_API_KEY.")
else:
    print(f"Gemini API key loaded: {api_key[:4]}...{'*' * (len(api_key)-8)}...{api_key[-4:]}")

client = genai.Client(api_key=api_key)

# Use Gemini 1.5 Flash for both vision and text
MODEL_VISION = "gemini-1.5-flash"
MODEL_TEXT = "gemini-1.5-flash"

def ask_gemini_vision(question: str, image: Image.Image) -> str:
    # Convert PIL image to bytes
    img_bytes = BytesIO()
    image.save(img_bytes, format='PNG')
    img_bytes.seek(0)
    
    # Use the new API structure with correct content format
    response = client.models.generate_content(
        model=MODEL_VISION,
        contents={
            "role": "user",
            "parts": [
                {"text": question},
                {"inline_data": {"mime_type": "image/png", "data": img_bytes.read()}}
            ]
        }
    )
    return response.text

def ask_gemini_text(question: str, context: Optional[str] = None) -> str:
    prompt = question if not context else f"{context}\n{question}"
    
    # Use the new API structure with correct content format
    response = client.models.generate_content(
        model=MODEL_TEXT,
        contents={
            "role": "user",
            "parts": [
                {"text": prompt}
            ]
        }
    )
    return response.text

def fetch_image_from_url(url: str) -> Image.Image:
    resp = requests.get(url)
    resp.raise_for_status()
    return Image.open(BytesIO(resp.content))