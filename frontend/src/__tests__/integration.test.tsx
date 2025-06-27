import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import QAInterface from '../components/QAInterface';

jest.mock('../services/api', () => ({
  askQA: jest.fn(async ({ question, imageFile, imageUrl }) => {
    if (imageFile) return { answer: 'Image answer', used_fallback: false };
    if (imageUrl) return { answer: 'URL answer', used_fallback: false };
    return { answer: 'Text fallback', used_fallback: true };
  })
}));

describe('QAInterface Integration', () => {
  it('handles image upload', async () => {
    render(<QAInterface />);
    fireEvent.change(screen.getByLabelText(/Upload Image/i), {
      target: { files: [new File(['dummy'], 'test.png', { type: 'image/png' })] }
    });
    fireEvent.change(screen.getByLabelText(/Question/i), { target: { value: 'What is in the image?' } });
    fireEvent.click(screen.getByText(/Ask/i));
    await waitFor(() => screen.getByText(/Image answer/i));
  });

  it('handles image URL', async () => {
    render(<QAInterface />);
    fireEvent.change(screen.getByLabelText(/Image URL/i), { target: { value: 'http://example.com/image.jpg' } });
    fireEvent.change(screen.getByLabelText(/Question/i), { target: { value: 'Describe the image.' } });
    fireEvent.click(screen.getByText(/Ask/i));
    await waitFor(() => screen.getByText(/URL answer/i));
  });

  it('handles fallback to text-only', async () => {
    render(<QAInterface />);
    fireEvent.change(screen.getByLabelText(/Question/i), { target: { value: 'No image provided.' } });
    fireEvent.click(screen.getByText(/Ask/i));
    await waitFor(() => screen.getByText(/Text fallback/i));
  });
}); 