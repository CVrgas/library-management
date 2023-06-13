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
    const wrongInput = document.getElementById('notfound');
    wrongInput.style.opacity = '0';
    if (this.loginForm.status == 'INVALID') {
      return;
    }
    let request: LogInRequest = {
      Email: this.loginForm.value.Email,
      Password: this.loginForm.value.Password,
    };
    this.appService.LogIn(this.loginForm.value).subscribe(
      (response) => {
        if (response.status == 204) {
          this.notfound('We couldnt find an account that matches');
          return;
        }
        if (response.status == 200) {
          this.Auth.logIn(response.body['id']);
          this.router.navigate(['/home']);
          return;
        }
        console.error('error ocurred, try again');
      },
      (error) => {
        if (error.status === 0) {
          this.notfound('No internet connection');
          this.LocalConnection();
        }
      }
    );
  }
  notfound(msg: string) {
    console.error(msg);
    const MsgElement = document.getElementById('notfound');
    MsgElement.innerText = msg;
    MsgElement.style.opacity = '1';
  }
  LocalConnection() {
    this.Auth.logIn('389');
    this.router.navigate(['/home']);
  }
}
