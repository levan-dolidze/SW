import { ErrorMessagesService } from './../services/error-messages.service';
import { Router } from '@angular/router';
import { UserModel } from './../models/UserModel';
import { HttpService } from './../services/http.service';
import { Component, OnDestroy, OnInit, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'home',
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
  //ინფინიტ სკროლის ფუნქცია როდესაც პირობა სრულდება სწროლის ივენთზე იძახებს სერვისიდან returnAllUsers მეთოდს
  // რომელიც აბრუნებს ყველა ცხოველის ინფოს და გადაეცემა პარამეტრები რამდენი ობიექტი წამოიღოს
  infiniteScroll() {
    window.addEventListener('scroll', () => {
      if (window.scrollY + window.innerHeight > document.documentElement.scrollHeight) {
        this.returnAllUsers(this.page, this.size)
      };
    });
  };



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

  returnImgUrl(id: any): any {
    for (let index = 0; index < this.allUsers.length; index++) {
      return `${this.allUsers[index].imageUrl}?${id}`
    };
  };
  
  ngOnDestroy(): void {
    this.allUsersDistr.unsubscribe();
  };;
  // testRecurs(number = 0) {
  //   console.log(number)
  //   if (number == 20) {
  //     return
  //   }

  //   number++

  //   this.test(number)
  // }

 
};



