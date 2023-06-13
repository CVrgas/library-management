import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Models/book';
import { AppService } from 'src/app/service/Api/app.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {
    for (let index = 1; index < 40; index++) {
      let new_item = { id: index, text: `item numero ${index}` };
      this.items.push(new_item);
    }
  }
  ngAfterViewInit(): void {
    this.loadItems();
  }

  items: any = [];
  ItemPerPage: number = 5;
  actual_page: number = 1;

  previous() {
    if (this.actual_page >= 2) {
      this.actual_page--;
      this.loadItems();
    }
  }
  next() {
    if (this.actual_page <= this.items.length / 5) {
      this.actual_page++;
      this.loadItems();
    }
  }

  loadItems() {
    let list = document.querySelectorAll('.my-pagiantion .item');

    let beginAt = this.ItemPerPage * (this.actual_page - 1);
    let endAt = this.ItemPerPage * this.actual_page - 1;

    list.forEach((item, key) => {
      (item as HTMLElement).style.display = 'none';
      if (key >= beginAt && key <= endAt) {
        (item as HTMLElement).style.display = 'block';
      }
    });
  }
}
