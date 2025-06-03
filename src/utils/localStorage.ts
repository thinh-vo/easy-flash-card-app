import { Flashcard } from '../types/flashcard';

const FLASHCARDS_KEY = 'flashcards';

export const getFlashcardsFromLocalStorage = (): Flashcard[] => {
  const stored = localStorage.getItem(FLASHCARDS_KEY);
  if (!stored) return [];
  const parsed: Flashcard[] = JSON.parse(stored);
  return parsed.map((card) => ({
    ...card,
    createdAt: new Date(card.createdAt),
  }));
};

export const saveFlashcardsToLocalStorage = (flashcards: Flashcard[]): void => {
  localStorage.setItem(FLASHCARDS_KEY, JSON.stringify(flashcards));
};