import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/smalls/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { AuthService } from './service/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './components/account/account.component';
import { AuthGuard } from './service/auth/auth.guard';
import { BookComponent } from './components/smalls/book/book.component';
import { MybooksComponent } from './components/mybooks/mybooks.component';
import { SBookdetailComponent } from './components/smalls/small-bookdetail/small-bookdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    SearchResultComponent,
    AccountComponent,
    BookComponent,
    MybooksComponent,
    SBookdetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
