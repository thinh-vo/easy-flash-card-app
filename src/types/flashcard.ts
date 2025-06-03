export interface Flashcard {
  frontImage: string;
  backText: string;
  pronunciation: string;
  createdAt: Date; // Ensure createdAt is explicitly typed as Date
}