export interface QARequest {
  question: string;
  image_url?: string;
}
 
export interface BoundingBox {
  label: string;
  confidence: number;
  box: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface QAResponse {
  answer: string;
  used_fallback: boolean;
  error?: string;
  boundingBoxes?: BoundingBox[];
}