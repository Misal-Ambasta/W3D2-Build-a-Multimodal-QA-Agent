from services.gemini_service import ask_gemini_text

def test_text_api():
    try:
        # Test the text API
        question = "What is functional programming?"
        print(f"Asking question: {question}")
        
        response = ask_gemini_text(question)
        print("\nResponse from Gemini Text API:")
        print("-" * 50)
        print(response)
        print("-" * 50)
        
        # Test with context
        context = "Functional programming is a programming paradigm."
        question_with_context = "Explain its key principles."
        print(f"\nAsking question with context: {question_with_context}")
        print(f"Context: {context}")
        
        response_with_context = ask_gemini_text(question_with_context, context)
        print("\nResponse from Gemini Text API with context:")
        print("-" * 50)
        print(response_with_context)
        print("-" * 50)
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_text_api()