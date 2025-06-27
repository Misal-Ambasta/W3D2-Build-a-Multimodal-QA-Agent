import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function askQA({ question, imageFile, imageUrl }: { question: string; imageFile?: File; imageUrl?: string }) {
  const formData = new FormData();
  formData.append('question', question);
  if (imageFile) formData.append('image', imageFile);
  if (imageUrl) formData.append('image_url', imageUrl);
  try {
    const response = await axios.post(`${API_URL}/qa`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || 'API Error');
    }
    throw new Error('Network or server error');
  }
} 