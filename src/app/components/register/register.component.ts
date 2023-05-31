import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AppService } from '../../service/Api/app.service';
import { LogInRequest, User } from '../../Models/user';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private service: AppService,
    private Auth: AuthService,
    private router: Router
  ) {}

  MathPass: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    let password = control.get('password');
    let confirmPassword = control.get('confirmPassword');

    if (password.value != confirmPassword.value) {
      return { NotSame: true };
    }
    return null;
  };

  registerForm = new FormGroup(
    {
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      confirmPassword: new FormControl(null),
    },
    {
      validators: this.MathPass,
    }
  );

  onSubmit() {
    const errortext = document.getElementById('Error-text');
    let newUser: User = {
      id: 0,
      FirstName: this.registerForm.controls['firstname'].value,
      Lastname: this.registerForm.controls['lastname'].value,
      Email: this.registerForm.controls['email'].value,
      Password: this.registerForm.controls['confirmPassword'].value,
    };

    this.service.SignUp(newUser).subscribe(
      (response) => {
        if (response.status == 200) {
          console.log('account created');
          let LogInRequest: LogInRequest = {
            Email: this.registerForm.controls['email'].value,
            Password: this.registerForm.controls['confirmPassword'].value,
          };
          this.service.LogIn(LogInRequest).subscribe(
            (res) => {
              this.Auth.logIn(response.body['id']);
              this.router.navigate(['/account']);
            },
            (error) => {
              console.error('Unexpected error log in');
            }
          );
        }
      },
      (error) => {
        errortext.style.display = 'block';
        console.log(error);
      }
    );
  }
}
