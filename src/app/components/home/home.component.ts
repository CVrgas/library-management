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
import { DataService } from 'src/app/service/DataService/data-service.service';
import { OfflineService } from 'src/app/service/offlineService/offline.service';

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
  constructor(
    private appService: AppService,
    private offlineService: OfflineService,
    private router: Router,
    private dataService: DataService
  ) {
    this.dataService.currentOStatus.subscribe(
      (status) => (this.OfflineStatus = status)
    );
  }

  searchArg: string | null = null;
  books: Book[] | null = [];
  IsData: boolean = false;
  ShowResponse: boolean = false;
  OfflineStatus: Boolean;

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
          // this.ErrorMsg('no internet connection');
          this.dataService.ShowAlert();
          // this.ShowResponse = false;
        }
      }
    );
  }
  LocalSearch() {
    console.log('Local');
    this.books = this.offlineService.searchBook(this.searchArg);
    if (this.books.length <= 0) {
      this.ShowResponse = true;
      this.IsData = false;
    } else {
      this.ShowResponse = true;
      this.IsData = true;
    }
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
