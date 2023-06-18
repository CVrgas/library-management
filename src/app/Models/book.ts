export interface Book {
  id: number;
  title: string;
  year: number;
  author: string;
  description: string;
  genres: string;
}
export interface Relation {
  id: number;
  userId: number;
  bookId: number;
}
