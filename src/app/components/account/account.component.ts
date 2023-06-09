import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Models/book';
import { AppService } from 'src/app/service/Api/app.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
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
      },
      (error) => {
        console.error('fail to load any book');
      }
    );
  }
  books: Book[] = [];
}
