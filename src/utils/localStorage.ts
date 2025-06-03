import { Flashcard } from '../types/flashcard';

const FLASHCARDS_KEY = 'flashcards';

export const getFlashcardsFromLocalStorage = (): Flashcard[] => {
  const stored = localStorage.getItem(FLASHCARDS_KEY);
  if (!stored) return [];
  const parsed = JSON.parse(stored);
  return parsed.map((card: Flashcard) => ({
    ...card,
    createdAt: card.createdAt ? new Date(card.createdAt) : undefined,
  }));
};

export const saveFlashcardsToLocalStorage = (flashcards: Flashcard[]) => {
  localStorage.setItem(FLASHCARDS_KEY, JSON.stringify(flashcards)); // Ensure only the updated list is saved
};