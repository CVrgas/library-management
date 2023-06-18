import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/Models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent {
  @Input() book: Book;
  @Output() close = new EventEmitter();
  closeWindow() {
    this.close.emit();
  }
}
