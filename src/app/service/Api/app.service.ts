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

  //local Funtion
  Local_Search(arg: string) {
    return this.Books_LocalStore.filter((x) => x.year === parseInt(arg));
  }
  Local_UserExist(userId: number) {
    return this.user_localStore.find((x) => x.id === userId);
  }
  Local_EmailExist(email: string) {
    return this.user_localStore.find((x) => x.Email === email);
  }

  Local_BookExist(bookId: number) {
    return this.Books_LocalStore.find((x) => x.id === bookId);
  }
  Local_SubscriptionExist(userId: number, bookId: number) {
    return this.Subscriptions_LocalStore.find(
      (x) => x.userId === userId && x.BookId === bookId
    );
  }

  //local Call
  getuser(userid: number) {
    if (this.Local_UserExist(userid)) {
      return this.user_localStore.find((x) => x.id === userid);
    }
    return null;
  }
  user_nextId = 5;
  RegisterUser(user: User) {
    if (this.Local_EmailExist(user.Email)) {
      return null;
    }
    user.id = this.user_nextId;
    this.user_nextId++;
    this.user_localStore.push(user);
    return user;
  }

  searchBook(arg: string) {
    return this.Local_Search(arg);
  }

  getBookSubscribed(user: number) {
    if (this.Local_UserExist(user) === undefined) {
      return null;
    }
    const subscriptions = this.Subscriptions_LocalStore.filter(
      (x) => x.userId === user
    );
    let result: Book[] = [];
    subscriptions.forEach((element) => {
      result.push(this.Books_LocalStore.find((x) => x.id === element.BookId));
    });
    return result;
  }

  subscribe_nextId = 10;
  subcribeToBook(userid: number, bookId: number) {
    if (this.Local_SubscriptionExist(userid, bookId)) {
      return null;
    }
    if (this.Local_UserExist(userid) && this.Local_BookExist(bookId)) {
      let result = {
        id: this.subscribe_nextId,
        userId: userid,
        BookId: bookId,
      };
      this.Subscriptions_LocalStore.push(result);
      this.subscribe_nextId++;
      return this.Subscriptions_LocalStore.find((x) => x.id === result.id);
    }
    return null;
  }

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
  SubscribeBookAsync(bookId: number) {
    return this.http.put(
      `https://localhost:7011/api/${this.token}/book`,
      bookId
    );
  }

  //local storage
  Books_LocalStore: Book[] = [
    {
      id: 0,
      title: 'Book 1',
      year: 2020,
      author: 'string',
      description: 'string',
      genres: 'string',
    },
    {
      id: 1,
      title: 'Book 2',
      year: 2021,
      author: 'string',
      description: 'string',
      genres: 'string',
    },
    {
      id: 2,
      title: 'Book 3',
      year: 2020,
      author: 'string',
      description: 'string',
      genres: 'string',
    },
    {
      id: 3,
      title: 'string 4',
      year: 2021,
      author: 'string',
      description: 'string',
      genres: 'string',
    },
    {
      id: 4,
      title: 'string 5',
      year: 2019,
      author: 'string',
      description: 'string',
      genres: 'string',
    },
    {
      id: 5,
      title: 'string 6',
      year: 2022,
      author: 'string',
      description: 'string',
      genres: 'string',
    },
    {
      id: 6,
      title: 'string 7',
      year: 2022,
      author: 'string',
      description: 'string',
      genres: 'string',
    },
    {
      id: 7,
      title: 'string 8',
      year: 2019,
      author: 'string',
      description: 'string',
      genres: 'string',
    },
    {
      id: 8,
      title: 'string 9',
      year: 2021,
      author: 'string',
      description: 'string',
      genres: 'string',
    },
    {
      id: 9,
      title: 'string 10',
      year: 2023,
      author: 'string',
      description: 'string',
      genres: 'string',
    },
    {
      id: 10,
      title: 'string 11',
      year: 2022,
      author: 'string',
      description: 'string',
      genres: 'string',
    },
    {
      id: 11,
      title: 'string 12',
      year: 2023,
      author: 'string',
      description: 'string',
      genres: 'string',
    },
  ];
  user_localStore: User[] = [
    {
      id: 0,
      FirstName: 'string',
      Lastname: 'string',
      Password: 'string',
      Email: 'string',
    },
    {
      id: 1,
      FirstName: 'string',
      Lastname: 'string',
      Password: 'string',
      Email: 'string',
    },
    {
      id: 2,
      FirstName: 'string',
      Lastname: 'string',
      Password: 'string',
      Email: 'string',
    },
    {
      id: 3,
      FirstName: 'string',
      Lastname: 'string',
      Password: 'string',
      Email: 'string',
    },
    {
      id: 4,
      FirstName: 'string',
      Lastname: 'string',
      Password: 'string',
      Email: 'string',
    },
  ];
  Subscriptions_LocalStore = [
    {
      id: 0,
      userId: 1,
      BookId: 2,
    },
    {
      id: 2,
      userId: 1,
      BookId: 5,
    },
    {
      id: 3,
      userId: 1,
      BookId: 3,
    },
    {
      id: 4,
      userId: 2,
      BookId: 1,
    },
    {
      id: 5,
      userId: 2,
      BookId: 8,
    },
    {
      id: 6,
      userId: 3,
      BookId: 7,
    },
    {
      id: 7,
      userId: 2,
      BookId: 10,
    },
    {
      id: 8,
      userId: 3,
      BookId: 11,
    },
    {
      id: 9,
      userId: 3,
      BookId: 5,
    },
  ];
}
