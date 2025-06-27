import React from 'react';
import type { QAResponse } from '../types';

type Props = {
  loading: boolean;
  error: string | null;
  response: QAResponse | null;
};

const ResponseDisplay: React.FC<Props> = ({ loading, error, response }) => {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <span>Processing your request...</span>
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!response) {
    return null;
  }

  // Format the answer text with proper paragraph breaks
  const formattedAnswer = response.answer.split('\n\n').map((paragraph: string, index: number) => (
    <p key={index}>{paragraph}</p>
  ));

  return (
    <div className="response-display">
      <div className="response-header">
        <h3>Response</h3>
      </div>
      <div className="response-content">
        {formattedAnswer}
      </div>
      {response.boundingBoxes && response.boundingBoxes.length > 0 ? (
        <div className="bounding-boxes">
          <h4>Detected Objects:</h4>
          <pre>{JSON.stringify(response.boundingBoxes, null, 2)}</pre>
        </div>
      ) : null}
    </div>
  );

};

export default ResponseDisplay;