export interface Flashcard {
  frontImage: string;
  backText: string;
  pronunciation: string; // now just the word itself
  createdAt?: Date; // Add createdAt field
}