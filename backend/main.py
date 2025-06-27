from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import os
from models.schemas import QARequest, QAResponse
from services.gemini_service import ask_gemini_vision, ask_gemini_text, fetch_image_from_url
from services.image_service import read_image_from_upload
import logging

load_dotenv()

app = FastAPI()

origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/qa", response_model=QAResponse)
async def multimodal_qa(
    question: str = Form(...),
    image: UploadFile = File(None),
    image_url: str = Form(None)
):
    try:
        image_obj = None
        if image is not None:
            image_obj = await read_image_from_upload(image)
        elif image_url:
            image_obj = fetch_image_from_url(image_url)
        if image_obj:
            try:
                answer = ask_gemini_vision(question, image_obj)
                return QAResponse(answer=answer, used_fallback=False)
            except Exception as e:
                logging.warning(f"Vision model failed: {e}, falling back to text-only.")
        # Fallback to text-only
        answer = ask_gemini_text(question)
        return QAResponse(answer=answer, used_fallback=True)
    except Exception as e:
        logging.error(f"QA endpoint error: {e}")
        return JSONResponse(status_code=500, content=QAResponse(answer="", used_fallback=True, error=str(e)).dict()) 