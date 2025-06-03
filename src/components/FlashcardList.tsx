import React from 'react';
import Flashcard from './Flashcard';
import { Flashcard as FlashcardType } from '../types/flashcard';

interface FlashcardListProps {
  flashcards: FlashcardType[];
  onRemove: (index: number) => void;
}

const FlashcardList: React.FC<FlashcardListProps> = ({ flashcards, onRemove }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
    {flashcards.map((card, idx) => (
      <div key={idx} style={{ position: 'relative', margin: 8 }}>
        <Flashcard
          frontImage={card.frontImage}
          backText={card.backText}
          pronunciation={card.pronunciation}
        />
        <button
          onClick={() => onRemove(idx)}
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            background: '#ff5252',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: 28,
            height: 28,
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: 18,
            zIndex: 2,
          }}
          aria-label="Remove flashcard"
        >
          ×
        </button>
      </div>
    ))}
  </div>
);

export default FlashcardList;