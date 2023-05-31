import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/Models/book';
import { AppService } from 'src/app/service/Api/app.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  constructor(private appService: AppService, private route: Router) {}
  ngOnInit(): void {
    this.appService.getAllbooks().subscribe((response: Book[]) => {
      console.log(this.route.getCurrentNavigation());
    });
  }
  books: Book[];
  // books: Book[] = [
  //   {
  //     title: 'empty title',
  //     author: 'no author',
  //     year: 0,
  //     genres: 'no data',
  //   },
  //   {
  //     title: 'empty title',
  //     author: 'no author',
  //     year: 0,
  //     genres: 'no data',
  //   },
  //   {
  //     title: 'empty title',
  //     author: 'no author',
  //     year: 0,
  //     genres: 'no data',
  //   },
  // ];
}
