import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Book } from 'src/app/Models/book';
import { AppService } from 'src/app/service/Api/app.service';

@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.component.html',
  styleUrls: ['./mybooks.component.css'],
})
export class MybooksComponent implements OnInit {
  constructor(private service: AppService) {}
  async ngOnInit(): Promise<void> {
    await this.service.GetUserBooksAsync().subscribe(
      (res) => {
        res.forEach((element) => {
          element.author = element.author.replace(/-/g, ', ');
          element.author = element.author.replace(', ,', ', ');
        });
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
}
