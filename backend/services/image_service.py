from typing import Optional
from PIL import Image
from fastapi import UploadFile
import io

async def read_image_from_upload(file: UploadFile) -> Optional[Image.Image]:
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        return image
    except Exception:
        return None 