import { Book } from './book';

export interface User {
  id: number;
  firstName: string;
  lastname: string;
  password: string;
  email: string;
  borrowsbooks: Book[];
}
