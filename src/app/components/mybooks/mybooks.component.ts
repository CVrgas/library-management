import { Component, OnInit } from '@angular/core';
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
    let token = localStorage.getItem('token');
    await this.service.GetUserBooks(parseInt(token)).subscribe(
      (res) => {
        res.forEach(async (element) => {
          await this.service
            .getBookById(element.bookId)
            .subscribe((book: Book) => {
              book.author = book.author.replace('--', ', ');
              book.author = book.author.replace(/[-]/g, ', ');
              this.books.push(book);
            });
        });

        // console.log(this.books);
        // console.log(`Books lenght: ${this.books.length}`);
      },
      (error) => {
        if (error.status === 0) {
          console.error('no connection');
          this.localStorage();
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
  }

  // test -- playground
  id: number = 0;
  onClose() {
    this.book = null;
  }
  localStorage() {
    console.log('Loading local storage');
    let localBooks: Book[] = [
      {
        id: 1,
        title: 'Numero 1',
        author: 'Cristian',
        description: 'Empty',
        year: 2019,
        genres: 'crime',
      },
      {
        id: 3,
        title: 'Numero 2',
        author: 'C.V.',
        description: 'Empty',
        year: 2013,
        genres: 'crime',
      },
      {
        id: 2,
        title: 'Numero 3',
        author: 'Cristian',
        description: 'Empty',
        year: 2023,
        genres: 'Romace',
      },
    ];
    this.books = localBooks;
  }
}
