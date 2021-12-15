import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagesService {

  constructor() { }
  handleError() {
    alert("გადაამოწმეთ URL ")
  };

  imagesRunOut() {
    return 'THE END!'
  }
};
