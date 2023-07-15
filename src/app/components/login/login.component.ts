import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInRequest } from 'src/app/Models/user';
import { AppService } from 'src/app/service/Api/app.service';
import { DataService } from 'src/app/service/DataService/data-service.service';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private Auth: AuthService,
    private appService: AppService,
    private router: Router,
    private dataService: DataService
  ) {
    dataService.currentOStatus.subscribe(
      (status) => (this.OfflineStatus = status)
    );
  }

  OfflineStatus;
  loginForm = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    const MsgElement = document.getElementById('notify');
    MsgElement.innerText = ' ';
    if (this.loginForm.controls['Password'].status === 'INVALID') {
      this.NotifyError('password required');
      return;
    }
    if (this.loginForm.controls['Email'].status === 'INVALID') {
      this.NotifyError('Email is not valid');
      return;
    }
    this.appService.LogIn(this.loginForm.value).subscribe(
      (response) => {
        if (response.status == 204) {
          this.NotifyError('We couldnt find an account that matches');
          return;
        }
        if (response.status == 200) {
          this.Auth.logIn(response.body['id']);
          this.router.navigate(['/home']);
          return;
        }
      },
      (error) => {
        if (error.status === 0) {
          this.NotifyError('No internet connection');
          this.dataService.ShowAlert();
          // this.LocalConnection();
        }
      }
    );
  }
  NotifyError(msg: string) {
    const MsgElement = document.getElementById('notify');
    MsgElement.innerText = msg;
  }

  LocalConnection() {
    this.Auth.logIn('389');
    this.router.navigate(['/home']);
  }
}
