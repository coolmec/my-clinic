import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor{

  constructor() { }
  handleError(error: HttpErrorResponse): Observable<any>{
    console.log(`Error : status code ${error.status} - message : ${error.message}`);
    return throwError(error);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).
      pipe(
        catchError(this.handleError)
    );
  }
}
