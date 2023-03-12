import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookAPIService } from '../book-api.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent {
  book:any;
  bookId:any;
  books:any
  errMessage:string=''
  constructor(private _service: BookAPIService,private router:Router,private route: ActivatedRoute){
    this.route.params.subscribe((params) => {
      this.bookId = params['id']});
    this._service.getBook(this.bookId).subscribe({
      next:(data)=>{this.book=data},
      error:(err)=>{this.errMessage=err}
    })
  }
}
