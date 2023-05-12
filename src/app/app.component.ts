import {
  Component,
  EventEmitter,
  AfterViewInit,
  ViewChild,
  Directive,
} from '@angular/core';
import { LoginComponent } from './components/login/login.component';

@Directive({ selector: 'app-login' })
class applogin {}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'library-management';
  @ViewChild(applogin) AppLogin!: applogin;
  numero = 1;
  ngAfterViewInit(): void {}
  islogged = false;
}
