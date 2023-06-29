import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInRequest } from 'src/app/Models/user';
import { AppService } from 'src/app/service/Api/app.service';
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
    private router: Router
  ) {}

  loginForm = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    const notification = document.getElementById('notify');
    notification.innerText = ' ';
    if (this.loginForm.status == 'INVALID') {
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
