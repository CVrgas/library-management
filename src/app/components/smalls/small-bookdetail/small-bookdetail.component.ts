import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/Models/book';

@Component({
  selector: 'app-small-bookdetail',
  templateUrl: './small-bookdetail.component.html',
  styleUrls: ['./small-bookdetail.component.css'],
})
export class SBookdetailComponent {
  @Input() book: Book;
  @Output() action = new EventEmitter<string>();
  EmitAction(type: string) {
    this.action.emit(type);
  }
  ShowButtons() {
    const window = <HTMLElement>document.getElementById('links');
    window.style.display = 'flex';
  }
  close() {
    const window = <HTMLElement>document.getElementById('links');
    window.style.display = 'none';
  }

  // book: Book = {
  //   id: 1,
  //   title: 'back legend',
  //   author: 'cristian vargas',
  //   year: 2021,
  //   genres: 'action, romance',
  // };
}
