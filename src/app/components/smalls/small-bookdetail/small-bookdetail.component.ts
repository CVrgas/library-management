import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/Models/book';

@Component({
  selector: 'app-small-bookdetail',
  templateUrl: './small-bookdetail.component.html',
  styleUrls: ['./small-bookdetail.component.css'],
})
export class SBookdetailComponent {
  @Input() book: Book;
}
