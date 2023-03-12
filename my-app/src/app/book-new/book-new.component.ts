import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { BookAPIService } from '../book-api.service';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { Book } from '../interfaces/Book';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.css'],
})
export class BookNewComponent implements OnInit {
  book = new Book();
  books: any;
  errMessage: string = '';
  day:any
  constructor(
    private _service: BookAPIService,
    private router: Router,
    private http: HttpClient
  ) {
    this._service.getBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }
  ngOnInit(): void {}
  postBook() {
    this._service.postBook(this.book).subscribe({
      next: (data) => {
        (this.books = data),
        this.router.navigate([''])
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }
  @Input()
  requiredFileType: any;
  fileName = '';
  uploadProgress: number = 0;
  uploadSub: Subscription = new Subscription();
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.book.Image = file.name;
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('image', file);

      const upload$ = this.http
        .post('/upload', formData, {
          reportProgress: true,
          observe: 'events',
        })
        .pipe(finalize(() => this.reset()));

      this.uploadSub = upload$.subscribe((event) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total!));
        }
      });
    }
  }
  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }
  reset() {
    this.uploadProgress = 0;
    this.uploadSub = new Subscription();
  }
}
