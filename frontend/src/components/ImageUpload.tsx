import React, { useState } from 'react';

type Props = {
  image: File | null;
  setImage: (image: File | null) => void;
  imageUrl: string;
  setImageUrl: (url: string) => void;
};

const ImageUpload: React.FC<Props> = ({ image, setImage, imageUrl, setImageUrl }) => {
  const [uploadType, setUploadType] = useState<'file' | 'url'>('file');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <div className="image-upload">
      <div className="image-upload-tabs">
        <div 
          className={`image-upload-tab ${uploadType === 'file' ? 'active' : ''}`}
          onClick={() => setUploadType('file')}
        >
          Upload File
        </div>
        <div 
          className={`image-upload-tab ${uploadType === 'url' ? 'active' : ''}`}
          onClick={() => setUploadType('url')}
        >
          Image URL
        </div>
      </div>

      {uploadType === 'file' ? (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
        </div>
      ) : (
        <div className="url-input-container">
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            className="enhanced-input"
          />
          <button 
            type="button" 
            onClick={() => {
              setPreviewUrl(imageUrl);
              // Note: In a real implementation, you'd need to handle URL images differently
              // This is just for UI demonstration
            }}
            className="url-button"
          >
            Load
          </button>
        </div>
      )}

      {previewUrl && (
        <div className="image-preview">
          <img src={previewUrl} alt="Preview" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;