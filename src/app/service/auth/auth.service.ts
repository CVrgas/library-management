import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor() {}

  isAuthenticated() {
    return this.isLoggedIn.value;
  }

  logIn(token) {
    if (!localStorage.getItem(token)) {
      localStorage.setItem('token', token);
      this.isLoggedIn.next(true);
      return;
    }
    console.log('already loged');
  }
  logOut() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      this.isLoggedIn.next(false);
      return;
    }
    console.log('already logout');
  }
}
