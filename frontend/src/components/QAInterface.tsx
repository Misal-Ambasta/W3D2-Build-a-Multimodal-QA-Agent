import React, { useState } from 'react';
import QuestionInput from './QuestionInput';
import ImageUpload from './ImageUpload';
import ResponseDisplay from './ResponseDisplay';
import { askQA } from '../services/api';

const QAInterface: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const data = await askQA({ 
        question, 
        imageFile: imageFile || undefined, 
        imageUrl: imageUrl || undefined 
      });
      setResponse(data);
    } catch (err: any) {
      setError(err?.response?.data?.error || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQuestion('');
    setImageFile(null);
    setImageUrl('');
    setResponse(null);
    setError(null);
  };

  return (
    <div className="qa-interface">
      <form className="qa-form" onSubmit={handleSubmit}>
        <ImageUpload 
          image={imageFile} 
          setImage={setImageFile} 
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
        />
        <QuestionInput question={question} setQuestion={setQuestion} />
        <div className="button-container">
          <button 
            type="button" 
            className="reset-button" 
            onClick={handleReset}
          >
            Reset
          </button>
          <button 
            type="submit" 
            disabled={loading || !question || (!imageFile && !imageUrl)}
          >
            {loading ? 'Processing...' : 'Ask'}
          </button>
        </div>
      </form>
      <ResponseDisplay loading={loading} error={error} response={response} />
    </div>
  );
};

export default QAInterface;