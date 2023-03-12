import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookAPIService } from '../book-api.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent{
  books:any;
  errMessage:string=''
  constructor(private _service: BookAPIService,private router: Router){
    this._service.getBooks().subscribe({
      next:(data)=>{this.books=data},
      error:(err)=>{this.errMessage=err}
    })
  }
  edit(bookId: any){
    this.router.navigate(['book-update',bookId]);
  }
  viewDetails(bookId: any){
    this.router.navigate(['book-detail',bookId]);
  }
  delete(bookId: any){
    if (window.confirm('Are you sure you want to delete this row?')) {
      this._service.deleteBook(bookId).subscribe({
        next:(data)=>{this.books=data},
        error:(err)=>{this.errMessage=err}})
    } else {
      alert("Canceled!")
    }
  }
}
