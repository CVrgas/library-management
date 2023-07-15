import { AfterViewInit, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements AfterViewInit {
  constructor(private router: Router, private Auth: AuthService) {}
  ngAfterViewInit(): void {}

  @Input() LogStatus;

  logout() {
    this.Auth.logOut();
    this.router.navigate(['home']);
  }
}
