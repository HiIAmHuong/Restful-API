import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookNewComponent } from './book-new/book-new.component';
import { BookUpdateComponent } from './book-update/book-update.component';
import { BooksComponent } from './books/books.component';

const routes: Routes = [
  {path:'books',component:BooksComponent},
  {path:'book-detail',component:BookDetailComponent},
  {path:'book-detail/:id',component:BookDetailComponent},
  {path:'book-new',component:BookNewComponent},
  {path:'',component:BooksComponent},
  {path:'book-update',component:BookUpdateComponent},
  {path:'book-update/:id',component:BookUpdateComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
