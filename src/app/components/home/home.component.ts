import {
  style,
  trigger,
  state,
  transition,
  animate,
} from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/Models/book';
import { AppService } from 'src/app/service/Api/app.service';

//angular animation
const HideNShow = trigger('HideNShow', [
  state(
    'data',
    style({
      height: '70dvh',
    })
  ),
  state(
    'notData',
    style({
      height: '10dvh',
    })
  ),
  transition('* => notData', [animate('0.5s ease-out')]),
  transition('* => data', [animate('0.5s ease-in')]),
]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [HideNShow],
})
export class HomeComponent {
  constructor(private appService: AppService, private router: Router) {}

  searchArg: string | null = null;
  books: Book[] | null = [];
  IsData: boolean = false;
  ShowResponse: boolean = false;

  Search() {
    if (this.searchArg === null) {
      return;
    }

    this.appService.SearchBookAsync(this.searchArg).subscribe(
      (Response) => {
        if (Response.length <= 0) {
          this.books = null;
          this.ShowResponse = true;
          this.IsData = false;
          return;
        }
        this.books = Response;
        this.ShowResponse = true;
        setTimeout(() => {
          this.IsData = true;
        }, 1);
      },
      (e: HttpErrorResponse) => {
        if (e.status === 0) {
          this.ErrorMsg('no internet connection');
          this.ShowResponse = false;
        }
      }
    );
  }

  ErrorMsg(text: string) {
    const msgElement = document.getElementById('connection-msg');
    msgElement.innerText = text;
  }

  //Pagination Code
  ItemPerPage: number = 5;
  actual_page: number = 1;

  previous() {
    if (this.actual_page >= 2) {
      this.actual_page--;
      this.loadItems();
    }
  }
  next() {
    if (this.actual_page <= this.books.length / 5) {
      this.actual_page++;
      this.loadItems();
    }
  }

  loadItems() {
    let list = document.querySelectorAll('.table .books');
    console.log(`list count: ${list.length}`);

    let beginAt = this.ItemPerPage * (this.actual_page - 1);
    let endAt = this.ItemPerPage * this.actual_page - 1;
    list.forEach((item, key) => {
      (item as HTMLElement).style.display = 'none';
      if (key >= beginAt && key <= endAt) {
        (item as HTMLElement).style.display = 'block';
      }
    });
  }

  // Child Element Funtions
  book: any;
  showDetails(book: Book) {
    this.book = book;
  }
  onClose() {
    this.book = null;
  }
}
