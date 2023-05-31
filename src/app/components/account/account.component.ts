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
    console.log(token);
    await this.service.GetUserBooks(1).subscribe((res) => {
      let loadBook: any[];
      res.forEach(async (element) => {
        await this.service
          .getBookById(element.bookId)
          .subscribe((book: Book) => {});
      });
    });
  }
  books: Book[];
}
