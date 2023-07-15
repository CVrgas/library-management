import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
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
import { from } from 'rxjs';
import { DataService } from 'src/app/service/DataService/data-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private service: AppService,
    private Auth: AuthService,
    private router: Router,
    private dataService: DataService
  ) {}

  MatchPass: ValidatorFn = (
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
      validators: this.MatchPass,
    }
  );

  onSubmit() {
    console.log(JSON.stringify(this.registerForm.value));
    if (this.registerForm.invalid) {
      console.log(this.registerForm);
      console.log('invalid');
      return;
    }
    let newUser: User = {
      id: 0,
      FirstName: this.registerForm.controls['firstname'].value,
      Lastname: this.registerForm.controls['lastname'].value,
      Email: this.registerForm.controls['email'].value,
      Password: this.registerForm.controls['confirmPassword'].value,
    };
    this.service.SignUp(JSON.stringify(this.registerForm.value)).subscribe(
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
        if (error.status === 0) {
          this.notFound('No internet connection');
          this.dataService.ShowAlert();
          return;
        }
        if (error.status === 415) {
          this.notFound('email address already register');
          return;
        }
        console.error('Unexpected error');
      }
    );
  }

  notFound(Msg: string) {
    console.error(Msg);
    const MsgElement = document.getElementById('errorMsg');
    MsgElement.innerText = Msg;
  }
}
