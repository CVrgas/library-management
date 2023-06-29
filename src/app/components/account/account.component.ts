import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Book } from 'src/app/Models/book';
import { User } from 'src/app/Models/user';
import { AppService } from 'src/app/service/Api/app.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  constructor(private service: AppService) {}

  ngOnInit(): void {
    this.service.getUserInfoAsync().subscribe((res) => {
      const user: User = res;
      this.InformationChangeForm.setValue({
        firstName: user['firstName'],
        lastName: user['lastName'],
        email: user['email'],
      });
    });
  }

  //if error is displaying, where is going to be ( first form or second)
  Error_location = '';

  //custom validator that check if Password and its Confirmation is the same
  MatchPass: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    let password = control.get('password');
    let confirm = control.get('confirm');

    if (password.value != confirm.value) {
      return { NotSame: true };
    }
    return null;
  };

  //form for basic inform
  InformationChangeForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  //form for password
  passwordChangeForm = new FormGroup(
    {
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('', [Validators.required]),
    },
    {
      validators: this.MatchPass,
    }
  );

  //api call to change basic information
  changeUserInformation() {
    if (this.validateForm(this.InformationChangeForm)) {
      console.log('User information changed');
      return;
    }
  }

  //api call to change password
  changePassword() {
    if (this.validateForm(this.passwordChangeForm)) {
      console.log('Password changed');
      return;
    }
  }

  //validate the forms
  validateForm(form: FormGroup) {
    //check if form is valid, if it is return true
    if (form.valid && form.touched) {
      return true;
    }

    //p Element where the error text is going to be displayed
    //errorText = First Form ( For changing User basic information)
    //errorText2 = Second (for chaging passowrd)
    if (form === this.InformationChangeForm) {
      this.Error_location = 'errorText';
    } else {
      this.Error_location = 'errorText2';
    }

    //check if form is invalid, then
    //check if password and its confirmation is the same, then
    //check if the form submited is password change Form
    if (
      form.invalid &&
      form.errors != null &&
      this.Error_location === 'errorText2'
    ) {
      this.notifyError('notsame');
      return false;
    }

    //get and display the first input error.
    for (let control of Object.keys(form.controls)) {
      if (form.controls[control]?.errors) {
        this.notifyError(control);
        return false;
      }
    }

    return false;
  }

  //display error to the user
  notifyError(error: string) {
    //p element where input error is going to be displayed
    const notify_element = document.getElementById(this.Error_location);

    //list of error that can ocurred and its reponses for display
    let errorResponse = [
      {
        id: 'firstName',
        response: ' first name is required',
      },
      {
        id: 'lastName',
        response: ' last name is required',
      },
      {
        id: 'email',
        response: ' email is required',
      },
      {
        id: 'password',
        response: ' password name is required',
      },
      {
        id: 'confirm',
        response: ' password name is required',
      },
      {
        id: 'notsame',
        response: ' not matching passwords',
      },
    ];

    //displaying the error text
    notify_element.innerText = errorResponse.find(
      (x) => x.id === error
    ).response;
  }
}
