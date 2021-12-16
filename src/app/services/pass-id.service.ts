import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PassIdService {
  userId: Subject<number | string> = new Subject;
  constructor() { }


  passId() {
    this.userId.next();
  }
}
