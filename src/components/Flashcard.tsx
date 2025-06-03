import React, { useEffect } from 'react';

const cardStyle: React.CSSProperties = {
  width: 400,
  height: 200,
  borderRadius: 16,
  background: '#fff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  position: 'relative',
};

const frontStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
};

const backStyle: React.CSSProperties = {
  ...frontStyle,
  display: 'none', // Hide the back side by default
};

interface FlashcardProps {
  frontImage: string;
  backText: string;
  pronunciation: string;
  onFlip?: () => void;
  isFlipped?: boolean; // Add prop to control flipped state
  onRemove?: () => void; // Add prop for remove handler
  order?: number; // Add order prop
}

const Flashcard: React.FC<FlashcardProps> = ({
  frontImage,
  backText,
  pronunciation,
  onFlip = () => {},
  isFlipped = false,
  onRemove = () => {},
  order, // Add order prop
}) => {
  useEffect(() => {
    if (isFlipped) {
      const utter = new window.SpeechSynthesisUtterance(pronunciation);
      utter.lang = /[a-zA-Z]/.test(pronunciation) ? 'en-US' : 'vi-VN';
      window.speechSynthesis.speak(utter);
    }
  }, [isFlipped]);

  return (
    <div className="flashcard" style={{ ...cardStyle, position: 'relative' }} onClick={onFlip}>
      <div
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          cursor: 'pointer',
          fontSize: 16,
          fontWeight: 'bold',
          color: '#fff',
          background: '#f44336',
          borderRadius: '50%',
          width: 24,
          height: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          zIndex: 2,
        }}
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        X
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 8,
          left: 8,
          fontSize: 14,
          fontWeight: 'bold',
          color: '#fff',
          background: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background for visibility
          borderRadius: 4,
          padding: '2px 6px',
          zIndex: 2, // Ensure the order number is in front of the image
        }}
      >
        {order}
      </div>
      {isFlipped ? (
        <div style={{ ...cardStyle, background: '#fffbf2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontSize: 18, color: '#ff7043', fontWeight: 'bold', textAlign: 'center' }}>
            {backText}
          </p>
        </div>
      ) : frontImage ? (
        <img src={frontImage} alt="Flashcard front" style={{ ...frontStyle, zIndex: 1 }} />
      ) : (
        <div
          style={{
            ...frontStyle,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#bbb',
            fontSize: 22,
            fontWeight: 'bold',
            background: '#f5f5f5',
            border: '2px dashed #ccc',
            userSelect: 'none',
          }}
        >
          Tap to flip
        </div>
      )}
    </div>
  );
};

export default Flashcard;