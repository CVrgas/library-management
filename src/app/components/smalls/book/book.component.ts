import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent {
  @Input() book;
  @Output() close = new EventEmitter();
  closeWindow() {
    this.close.emit();
  }
}
