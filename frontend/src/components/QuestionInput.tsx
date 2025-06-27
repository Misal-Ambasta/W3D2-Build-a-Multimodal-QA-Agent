import React from 'react';

interface QuestionInputProps {
  question: string;
  setQuestion: (question: string) => void;
}

const QuestionInput: React.FC<QuestionInputProps> = ({ question, setQuestion }) => {
  return (
    <div className="question-input">
      <label htmlFor="question">Question:</label>
      <div className="input-wrapper">
        <input
          type="text"
          id="question"
          className="enhanced-input"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about the image..."
        />
      </div>
    </div>
  );
};

export default QuestionInput;