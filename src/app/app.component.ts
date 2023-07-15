import { Component, Directive, OnInit } from '@angular/core';
import { AuthService } from './service/auth/auth.service';
import { DataService } from './service/DataService/data-service.service';
import { Observable, Subscription } from 'rxjs';

// @Directive({ selector: 'app-login' })

// class applogin {}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private Auth: AuthService, private dataService: DataService) {
    Auth.isLoggedIn.subscribe((value) => {
      this.LogStatus = value;
    });
  }

  ngOnInit(): void {
    this.dataService.currentShowAlert.subscribe(
      (IsShow) => (this.ShowOfflineAlert = IsShow)
    );
    this.dataService.currentOStatus.subscribe(
      (OfflineMode) => (this.OfflineStatus = OfflineMode)
    );

    if (localStorage.getItem('token')) {
      this.Auth.logIn(localStorage.getItem('token'));
      return;
    }
    return;
  }

  LogStatus: Boolean;
  OfflineStatus: Boolean;
  ShowOfflineAlert: Boolean;
  title = 'library-management';
}
