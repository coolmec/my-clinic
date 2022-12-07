import {ErrorHandler, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMetadataService implements ErrorHandler{

  constructor() { }

  handleError(error: any): void {
    console.error('Something went wrong : ' + error );
  }
}
