import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { Book } from 'src/app/Models/book';
import { AppService } from 'src/app/service/Api/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private appService: AppService, private router: Router) {}

  searchArg = '';
  books: Book[] | null;

  send() {
    if (this.searchArg == '') {
      return;
    }

    this.appService.GetBookByArg(this.searchArg).subscribe(
      (Response) => {
        if (Response.length <= 0) {
          this.books = null;
          this.DOM_management();
          return;
        }

        this.books = Response;
        this.DOM_management();
        setTimeout(() => {
          this.loadItems();
        }, 500);
      },
      (e: HttpErrorResponse) => {
        if (e.status === 0) {
          this.ErrorMsg('no internet connection');
        }
      }
    );
  }

  DOM_management() {
    console.log('x: 1');
    if (this.books === null) {
      console.log('x: 2');

      const result = document.getElementById('result');
      const notfound = document.getElementById('notfound');
      const found = document.getElementById('found');

      notfound.style.display = 'flex';
      found.style.display = 'none';
      result.style.display = 'flex';
      setTimeout(() => {
        result.style.height = '150px';
      }, 1);
      return;
    }

    const result = document.getElementById('result');
    const notfound = document.getElementById('notfound');
    const found = document.getElementById('found');
    notfound.style.display = 'none';
    found.style.display = 'flex';
    result.style.display = 'flex';

    setTimeout(() => {
      result.style.height = '80dvh';
    }, 1);
  }
  ErrorMsg(text: string) {
    const msgElement = document.getElementById('msg');
    msgElement.innerText = text;
    msgElement.style.opacity = '1';
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
  say(action: string) {
    console.log('Emitted, ' + action);
  }
  book: any;
  showDetails(book: Book) {
    this.book = book;
  }
  onClose() {
    this.book = null;
  }
}
