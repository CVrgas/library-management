import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, Relation } from 'src/app/Models/book';
import { LogInRequest, User } from 'src/app/Models/user';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}
  bookUrl = 'https://localhost:7011/api/book';

  getAllbooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.bookUrl);
  }
  getBookById(id): Observable<Book> {
    return this.http.get<Book>(`${this.bookUrl}/${id}`);
  }
  GetBookByArg(arg: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.bookUrl}?arg=` + arg);
  }
  GetUserBooks(token: number): Observable<Relation[]> {
    return this.http.get<Relation[]>(
      `https://localhost:7011/api/${token}/book`
    );
  }
  RentBook(bookId: number) {
    let userId = localStorage.getItem('token');
    console.log(bookId);
    return this.http.put(`https://localhost:7011/api/${userId}/book`, bookId);
  }

  LogIn(request: LogInRequest) {
    return this.http.post('https://localhost:7011/api/user/login', request, {
      observe: 'response',
    });
  }

  SignUp(request: User) {
    return this.http.put('https://localhost:7011/api/user/signup', request, {
      observe: 'response',
    });
  }
}
