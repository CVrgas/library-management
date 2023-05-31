import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account/account.service';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router, private Auth: AuthService) {}

  @Input() status;

  logout() {
    this.Auth.logOut();
    this.router.navigate(['home']);
  }
}
