import React, { useEffect, useState } from 'react';
import FlashcardForm from '../components/FlashcardForm';
import Flashcard from '../components/Flashcard'; // Ensure this is the correct default import
import { Flashcard as FlashcardType } from '../types/flashcard';
import { saveFlashcardsToLocalStorage, getFlashcardsFromLocalStorage } from '../utils/localStorage';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

const defaultInitTime = new Date(); // Default createdAt time for all cards

const defaultFlashcards = [
  { frontImage: '/images/lion.png', backText: 'Lion', pronunciation: 'Lion', createdAt: defaultInitTime },
  { frontImage: '/images/tiger.png', backText: 'Tiger', pronunciation: 'Tiger', createdAt: defaultInitTime },
  { frontImage: '/images/elephant.png', backText: 'Elephant', pronunciation: 'Elephant', createdAt: defaultInitTime },
  { frontImage: '/images/giraffe.png', backText: 'Giraffe', pronunciation: 'Giraffe', createdAt: defaultInitTime },
  { frontImage: '/images/zebra.png', backText: 'Zebra', pronunciation: 'Zebra', createdAt: defaultInitTime },
  { frontImage: '/images/panda.png', backText: 'Panda', pronunciation: 'Panda', createdAt: defaultInitTime },
];

const Home: React.FC = () => {
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [todayCount, setTodayCount] = useState<number>(0); // Explicitly typed as number
  const [username, setUsername] = useState<string | null>(null);
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]); // Track flipped cards
  const [showTodayOnly, setShowTodayOnly] = useState(false);
  const { language } = useLanguage();

  // Helper to update today's count
  const updateTodayCount = (cards: FlashcardType[]) => {
    const today = new Date().toDateString();
    const count = cards.filter(
      (card) => card.createdAt && new Date(card.createdAt).toDateString() === today
    ).length;
    setTodayCount(count);
  };

  useEffect(() => {
    const storedFlashcards = getFlashcardsFromLocalStorage();
    if (storedFlashcards && storedFlashcards.length > 0) {
      const sortedFlashcards = storedFlashcards.sort(
        (a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
      );
      setFlashcards(sortedFlashcards);
      updateTodayCount(sortedFlashcards);
    } else {
      const sortedDefaultFlashcards = defaultFlashcards.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setFlashcards(sortedDefaultFlashcards);
      saveFlashcardsToLocalStorage(sortedDefaultFlashcards);
      updateTodayCount(sortedDefaultFlashcards);
    }
  }, []);

  const addFlashcard = ({ frontImage: image, backText, pronunciation }: { frontImage: string; backText: string; pronunciation: string }) => {
    if (!backText || backText?.trim() === "") {
      alert("Please fill in the word ");
      return;
    }

    const isDuplicate = flashcards.some((card) => card.backText === backText);

    if (!isDuplicate) {
      const newFlashcard: FlashcardType = {
        frontImage: image,
        backText: backText,
        pronunciation: backText,
        createdAt: new Date(),
      };
      const updatedFlashcards = [...flashcards, newFlashcard].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setFlashcards(updatedFlashcards);
      saveFlashcardsToLocalStorage(updatedFlashcards);
      updateTodayCount(updatedFlashcards);
    } else {
      alert("This flashcard already exists!");
    }
  };

  const removeFlashcard = (index: number) => {
    const updatedFlashcards = flashcards.filter((_, i) => i !== index);
    setFlashcards(updatedFlashcards);
    saveFlashcardsToLocalStorage(updatedFlashcards); // Save updated list to local storage
  };

  const handleSetUsername = () => {
    const name = prompt(
      language === 'en' ? 'Enter your name:' : 'Nhập tên của bạn:'
    );
    if (name) {
      setUsername(name);
      localStorage.setItem('username', name);
    }
  };

  const toggleFlip = (index: number) => {
    setFlippedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div style={{ padding: 16 }}>
      <LanguageSwitcher />
      <h1 style={{ textAlign: 'center' }}>Easy Flash Card App</h1>
      <FlashcardForm onAddFlashcard={addFlashcard}/>
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <h2>
          {language === 'en'
            ? `Total Flashcards: ${flashcards.length}`
            : `Tổng số thẻ: ${flashcards.length}`}
        </h2>
        <h3>
          {language === 'en'
            ? `Words Added Today: ${todayCount}`
            : `Số từ đã thêm hôm nay: ${todayCount}`}
        </h3>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <button
          onClick={() => setShowTodayOnly(!showTodayOnly)}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            background: '#ff9800',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {language === 'en'
            ? showTodayOnly
              ? 'Show All Cards'
              : 'Show Today\'s Cards'
            : showTodayOnly
            ? 'Hiển thị tất cả thẻ'
            : 'Hiển thị thẻ hôm nay'}
        </button>
      </div>
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        {username ? (
          <span style={{ fontSize: 16, fontWeight: 'bold' }}>
            {language === 'en' ? `Hello, ${username}!` : `Xin chào, ${username}!`}
          </span>
        ) : (
          <button
            onClick={handleSetUsername}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: '#4caf50',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {language === 'en' ? 'Set Username' : 'Đặt tên'}
          </button>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '16px',
          padding: '16px',
        }}
      >
        {flashcards.map((card, index) => (
          <Flashcard
            key={`${card.backText}-${index}`} // Ensure unique key for each flashcard
            frontImage={card.frontImage}
            backText={card.backText}
            pronunciation={card.pronunciation}
            onFlip={() => toggleFlip(index)} // Pass flip handler
            isFlipped={flippedIndexes.includes(index)} // Pass flipped state
            onRemove={() => removeFlashcard(index)} // Pass remove handler
            order={index + 1} // Pass the order of the card
          />
        ))}
      </div>
    </div>
  );
};

export default Home;