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

      case 'rent':
        if (localStorage.getItem('token')) {
          this.Subs_service.SubscribeBookAsync(this.book.id).subscribe(
            (res) => {},
            (error) => {
              console.log(' Unknow error renting book');
            }
          );
        }

        this.router.navigate(['/mybooks']);
        break;

      case 'contact':
        console.error('contact no implemented yet');
        break;

      default:
        console.error('Action not found');
        break;
    }
  }
}
