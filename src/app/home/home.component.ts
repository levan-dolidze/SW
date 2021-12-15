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
  count: number = 0;

  constructor(private http: HttpService, private router: Router, private passId: PassIdService) { }

  ngOnInit(): void {
    this.returnAllUsers(1, this.test)
    this.infiniteScroll();


  };


  infiniteScroll() {
    window.addEventListener('scroll', () => {
      if (window.scrollY + window.innerHeight > document.documentElement.scrollHeight) {
        this.allUsersDistr = this.http.getAllUsers(this.incrementPage, this.test).subscribe((response) => {
          this.allUser = response;
          this.allUsers = this.allUser.list;
        });
      }
    })

  }

  get incrementPage() {
    let count = 1
    return count
  }

  incrementSize(event: any) {
  
  }



  returnAllUsers(page: any, size: any) {

    this.allUsersDistr = this.http.getAllUsers(page, size).subscribe((response) => {
      this.allUser = response;
      this.allUsers = this.allUser.list;
      console.log(this.allUsers)
    });

  };

  viewDetailsHome(id: any) {
    this.router.navigate([`preview/${id}`])
    this.count++
  }
  ngOnDestroy(): void {
    this.allUsersDistr.unsubscribe();

  };



  returnImgUrl(id: any) {

    return `http://placeimg.com/640/480/animals?${id}`
  }
  // test(number = 0) {
  //   console.log(number)
  //   if (number == 20) {
  //     return
  //   }

  //   number++

  //   this.test(number)
  // }
  get test() {
    this.count += 20
    return this.count
  }

};


