from PIL import Image
from services.gemini_service import ask_gemini_vision
import os

def test_vision_api():
    # Get the absolute path to the sample image
    current_dir = os.path.dirname(os.path.abspath(__file__))
    sample_image_path = os.path.join(current_dir, 'sample', 'scooter.jpg')
    
    # Check if the file exists
    if not os.path.exists(sample_image_path):
        print(f"Error: Sample image not found at {sample_image_path}")
        return
    
    # Open the image
    try:
        image = Image.open(sample_image_path)
        print(f"Successfully loaded image: {sample_image_path}")
        
        # Test the vision API
        question = "Describe the contents of this image"
        print(f"Asking question: {question}")
        
        response = ask_gemini_vision(question, image)
        print("\nResponse from Gemini Vision API:")
        print("-" * 50)
        print(response)
        print("-" * 50)
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_vision_api()