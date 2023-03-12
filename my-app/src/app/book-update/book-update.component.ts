import { Component, Input, ViewChild } from '@angular/core';
import { BookAPIService } from '../book-api.service';
import { Book } from '../interfaces/Book';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Subscription, finalize } from 'rxjs';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css'],
})
export class BookUpdateComponent {
  book: any;
  bookId: any;
  books: any;
  errMessage: string = '';
  @ViewChild('file') file: any;
  constructor(
    private _service: BookAPIService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.route.params.subscribe((params) => {
      this.bookId = params['id'];
    });
    this._service.getBook(this.bookId).subscribe({
      next: (data) => {
        this.book = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }
  putBook() {
    this._service.putBook(this.book).subscribe({
      next: (data) => {
        (this.books = data),
        this.router.navigate(['']);
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
