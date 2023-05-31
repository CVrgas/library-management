import { Component, Directive, OnInit } from '@angular/core';
import { AuthService } from './service/auth/auth.service';

@Directive({ selector: 'app-login' })
class applogin {}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private Auth: AuthService) {
    Auth.isLoggedIn.subscribe((value) => {
      this.status = value;
    });
  }
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.Auth.logIn(localStorage.getItem('token'));
      return;
    }
    return;
  }

  status: boolean;
  title = 'library-management';
}
