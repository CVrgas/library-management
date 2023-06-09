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
  books: Book[];

  Submit() {}

  send() {
    if (this.searchArg == '') {
      return;
    }
    this.appService.GetBookByArg(this.searchArg).subscribe((Response) => {
      if (Response.length <= 0) {
        this.notfound();
        return;
      }
      this.found(Response.length);
      this.books = Response;
    });
  }

  notfound() {
    const result = document.getElementById('result');
    const notfound = document.getElementById('notfound');
    const found = document.getElementById('found');

    result.style.height = '250px';
    result.style.padding = '20px';
    found.classList.replace('show', 'hide');
    setTimeout(() => {
      notfound.classList.replace('hide', 'show');
    }, 500);
  }
  found(height) {
    const result = document.getElementById('result');
    const notfound = document.getElementById('notfound');
    const found = document.getElementById('found');

    result.style.height = `${height * 100}px`;
    result.style.padding = '20px';
    notfound.classList.replace('show', 'hide');

    setTimeout(() => {
      found.classList.replace('hide', 'show');
    }, 500);
  }
  rent(id: number) {
    this.appService.RentBook(id).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        if (error.error.text == 'relation already exist') {
          console.error('book already rented');
          return;
        }
        console.log(`Unknown error ocurred: ${error}`);
      }
    );
  }
}
