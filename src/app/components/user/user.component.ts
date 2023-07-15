import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/Models/book';
import { User } from 'src/app/Models/user';
import { AppService } from 'src/app/service/Api/app.service';

//angular Animation
const Grow = trigger('Grow', [
  state(
    'open',
    style({
      left: '50%',
      right: 0,
    })
  ),
  state(
    'close',
    style({
      left: 0,
      right: '50%',
    })
  ),
  transition('open => close', [animate('1s ease-out')]),
  transition('close => open', [animate('1s ease-in')]),
]);
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [Grow],
})
export class UserComponent {
  constructor(private service: AppService) {}
  //animation
  IsShow = false;

  //Books
  // SearchInput = '';
  // Search() {
  //   let Result: Book[] = this.service.searchBook(this.SearchInput);
  //   if (Result.length >= 1) {
  //     console.log(Result);
  //     return;
  //   }
  //   console.error('Not book found');
  // }

  //Subscription
  //get user(userid) Subscriptions
  // subscribedInput = '';
  // subscribed() {
  //   let Result: Book[] = this.service.getBookSubscribed(
  //     parseInt(this.subscribedInput)
  //   );
  //   if (this.subscribedInput === '') {
  //     console.error('Not subscriptions found');
  //     return;
  //   }
  //   if (Result.length >= 1) {
  //     console.log(Result);
  //     return;
  //   }
  //   console.log('Not book found');
  // }

  //subscribe to a book
  // Subscribe = new FormGroup({
  //   userId: new FormControl('', [Validators.required]),
  //   bookId: new FormControl('', [Validators.required]),
  // });
  // subscribe() {
  //   if (this.validation(this.Subscribe)) {
  //     let subscription = {
  //       userId: parseInt(this.Subscribe?.controls['userId'].value),
  //       bookId: parseInt(this.Subscribe?.controls['bookId'].value),
  //     };
  //     if (
  //       this.service.subcribeToBook(subscription.userId, subscription.bookId) !=
  //       null
  //     ) {
  //       console.log('subscribed');
  //     } else {
  //       console.error('Unknow Error, try again');
  //     }
  //   } else {
  //     console.error('not valid form');
  //   }
  // }

  //User
  //get user
  // userInput = '';
  // user() {
  //   let Result = this.service.getuser(parseInt(this.userInput));
  //   if (Result) {
  //     console.log(Result);
  //     return;
  //   }
  //   console.error('Not user found');
  // }

  //Register new user
  // Register_User = new FormGroup({
  //   id: new FormControl(''),
  //   FirstName: new FormControl('', [Validators.required]),
  //   Lastname: new FormControl('', [Validators.required]),
  //   Password: new FormControl('', [Validators.required]),
  //   Email: new FormControl('', [Validators.required, Validators.email]),
  // });
  // RegisterUser() {
  //   if (!this.validation(this.Register_User, true)) {
  //     console.error('Form invalid');
  //     return;
  //   }

    // const newUser: User = {
    //   id: 0,
    //   FirstName: this.Register_User?.controls['FirstName'].value,
    //   Lastname: this.Register_User?.controls['Lastname'].value,
    //   Password: this.Register_User?.controls['Password'].value,
    //   Email: this.Register_User?.controls['Email'].value,
    // };

    // if (this.service.RegisterUser(newUser) === null) {
    //   console.error('Email Already Exist');
    //   return;
    // }

    // RegisterUser
  //   console.log('registed');
  // }

  //utilities funtions

  // notify(msg: string, location?: boolean) {
  //   if (location) {
  //     const notification = document.getElementById('notificationU');
  //     notification.innerText = msg;
  //     setTimeout(() => {
  //       notification.innerHTML = '';
  //     }, 4000);
  //     return;
  //   }
  //   const notification = document.getElementById('notificationS');
  //   notification.innerText = msg;
  //   setTimeout(() => {
  //     notification.innerHTML = '';
  //   }, 4000);
  // }

  // validation(form: FormGroup, location?: boolean) {
  //   if (form.valid) {
  //     return true;
  //   }
  //   for (let control of Object.keys(form.controls)) {
  //     if (form.controls[control]?.errors) {
  //       this.notify(`${control} required`, location);
  //       return false;
  //     }
  //   }
  //   return false;
  // }
}
