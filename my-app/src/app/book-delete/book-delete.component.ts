import { Component } from '@angular/core';
import { BookAPIService } from '../book-api.service';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css']
})
export class BookDeleteComponent {
  books:any
  errMessage:string=''
  constructor(private _service: BookAPIService){
    this._service.getBooks().subscribe({
      next:(data)=>{this.books=data},
      error:(err)=>{this.errMessage=err} })
    }
    deleteBook(bookId:any) {
      this._service.deleteBook(bookId).subscribe({ next:(data)=>{this.books=data},
      error:(err)=>{this.errMessage=err}
    })
  }
}
