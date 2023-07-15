import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/Models/book';
import { User } from 'src/app/Models/user';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }
  bookUrl = 'https://localhost:7011/api/book';
  token: any;

  //Api calls
  getUserInfoAsync(): Observable<User> {
    return this.http.get<User>(`https://localhost:7011/api/user/${this.token}`);
  }
  LogIn(request: any) {
    return this.http.post('https://localhost:7011/api/user/login', request, {
      observe: 'response',
    });
  }
  SignUp(request: any) {
    return this.http.put('https://localhost:7011/api/user/signup', request, {
      observe: 'response',
    });
  }

  SearchBookAsync(arg: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.bookUrl}?arg=` + arg);
  }
  GetUserBooksAsync(): Observable<any> {
    return this.http.get<any[]>(`https://localhost:7011/${this.token}/books`);
  }
  SubscribeBookAsync(bookId: number): Observable<Book[]> {
    return this.http.post<Book[]>(
      `https://localhost:7011/api/${this.token}/book`,
      bookId
    );
  }

  DeleteSubscriptionAsync(bookId: number) {
    return this.http.delete(
      `https://localhost:7011/api/${this.token}/book/${bookId}`);
  }
}
