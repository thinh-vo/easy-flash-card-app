import React from 'react';

interface PopupProps {
  flashcard: {
    frontImage: string;
    backText: string;
    pronunciationAudio: string;
  };
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ flashcard, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <img src={flashcard.frontImage} alt="Flashcard Front" />
        <h2>{flashcard.backText}</h2>
        <audio controls>
          <source src={flashcard.pronunciationAudio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default Popup;