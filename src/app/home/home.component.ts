import { ErrorMessagesService } from './../services/error-messages.service';
import { PassIdService } from './../services/pass-id.service';
import { Router, Routes } from '@angular/router';
import { UserModel } from './../models/UserModel';
import { HttpService } from './../services/http.service';
import { Component, OnDestroy, OnInit, Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../common-css.css']
})

@Injectable({
  providedIn: 'root'
})
export class HomeComponent implements OnInit, OnDestroy {
  allUsers: Array<UserModel> = [];
  allUser: any;
  allUsersDistr: Subscription;
  // imgCount: number = 0;
  sizeCount: number = 0;
  pageCount: number = 1;
  theEndMessage: string;
  constructor(private http: HttpService, private router: Router, private errorMesage: ErrorMessagesService) { }

  ngOnInit(): void {
    this.returnAllUsers(this.page, this.size)
    this.infiniteScroll();
  };

  get size() {
    this.sizeCount += 20
    return this.sizeCount;
  };
  get page() {
    let count = 1
    return count;
  };

  infiniteScroll() {
    window.addEventListener('scroll', () => {
      if (window.scrollY + window.innerHeight > document.documentElement.scrollHeight) {
        this.returnAllUsers(this.page, this.size)
      };
    });
  };



  // incrementSize(event: any) {

  // }



  returnAllUsers(page: any, size: any) {
    this.allUsersDistr = this.http.getAllUsers(page, size).subscribe((response) => {
      this.allUser = response;
      this.allUsers = this.allUser.list;
    }, error => {
      this.theEndMessage = this.errorMesage.imagesRunOut();
    });
  };


  viewDetailsHome(id: any) {
    this.router.navigate([`preview/${id}`])
  };
  ngOnDestroy(): void {
    this.allUsersDistr.unsubscribe();
  };;



  returnImgUrl(id: any) {
    return `http://placeimg.com/640/480/animals?${id}`
  };
  // testRecurs(number = 0) {
  //   console.log(number)
  //   if (number == 20) {
  //     return
  //   }

  //   number++

  //   this.test(number)
  // }


};


