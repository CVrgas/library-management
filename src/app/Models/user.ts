import { Book } from './book';

export interface User {
  id: number;
  FirstName: string;
  Lastname: string;
  Password: string;
  Email: string;
}
export interface LogInRequest {
  Email: string;
  Password: string;
}
