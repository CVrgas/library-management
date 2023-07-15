import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Book } from 'src/app/Models/book';
import { AppService } from 'src/app/service/Api/app.service';

@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.component.html',
  styleUrls: ['./mybooks.component.css'],
})
export class MybooksComponent {
  constructor(private service: AppService) {
    // this.service.GetUserBooksAsync().

    this.service.GetUserBooksAsync().subscribe(
      (res: Book[]) => {
        console.log(res);
        res.map((book) => {
          book.author = book.author.replace(/-/g, ', ').replace(', ,', ', ');
          book.subsStatus = this.SetStatusCode(book.subsStatus);
        });
        res.sort();
        this.books = res;
      },
      (error) => {
        if (error.status === 0) {
          console.error('no connection');
          return;
        }
        console.error('fail to load any book');
      }
    );
  }

  books: Book[] = [];
  book: any;

  showDetails(book: Book) {
    this.book = book;
    window.scrollTo(0, 0);
  }

  onClose() {
    this.book = null;
  }
  SetStatusCode(code: any) {
    if (code === 2) {
      return true;
    }
    return false;
  }
}
