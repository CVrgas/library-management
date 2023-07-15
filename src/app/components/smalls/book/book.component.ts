import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/Models/book';
import { AppService } from 'src/app/service/Api/app.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent {
  constructor(private router: Router, private Subs_service: AppService) {}

  @Input() book: Book;
  @Output() close = new EventEmitter();

  closeWindow() {
    this.close.emit();
  }
  EventHandler(type: string) {
    switch (type) {
      case 'download':
        window.alert('Downloading Book...\n\n (no real download happening)');
        break;

      case 'Rent':
        this.Subscribe();
        break;

      case 'contact':
        console.error('contact no implemented yet');
        break;

      case 'Unrent':
        this.Unsubscribe();
        break;

      default:
        console.error('Action not found');
        break;
    }
  }
  Unsubscribe() {
    this.Subs_service.DeleteSubscriptionAsync(this.book.id).subscribe(
      (res) => {
        this.closeWindow();
        this.router.navigate(['/mybooks']);
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  Subscribe() {
    if (localStorage.getItem('token')) {
      this.Subs_service.SubscribeBookAsync(this.book.id).subscribe(
        (res) => {
          this.router.navigate(['/mybooks']);
        },
        (error) => {
          console.log(' Unknow error renting book');
        }
      );
    }
  }
}
