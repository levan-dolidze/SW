import { ErrorMessagesService } from './../services/error-messages.service';
import { Subscription } from 'rxjs';
import { PassIdService } from './../services/pass-id.service';
import { UserModel } from './../models/UserModel';
import { FullUserModel } from './../models/fullUserModel';
import { HttpService } from './../services/http.service';
import { Component, OnChanges, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css', '../common-css.css']
})

export class PreviewComponent implements OnInit, OnDestroy {
  allFriends: Array<UserModel> = [];
  allFriend: any;
  singleUser: FullUserModel;
  allFriendsDist: Subscription;
  singleUserDist: Subscription;
  link: any
  sizeCount: number = 0;
  pageCount: number = 1;
  theEndMessage: string;
  constructor(private activatedRoute: ActivatedRoute, private http: HttpService, private router: Router, private errorMesage: ErrorMessagesService) { }

  ngOnInit(): void {

    const userid = this.activatedRoute.snapshot.paramMap.get('id');
    this.getListOfAllFriends(userid);
    this.infiniteScrolling(userid);
    this.singleUserDist = this.http.getSingleUser(userid).subscribe((response) => {
      this.singleUser = response;

    }, error => {
      this.errorMesage.handleError();
    });
  };


  getListOfAllFriends(userid: any) {
    this.allFriendsDist = this.http.getListOfAllFriends(userid, this.page, this.size).subscribe((response) => {
      this.allFriend = response;
      this.allFriends = this.allFriend.list;

    }, error => {
      this.errorMesage.handleError();
    });
  };






  changeFriend(id: any) {

    this.returnImgUrl(id)
    this.singleUserDist = this.http.getSingleUser(id).subscribe((response) => {
      this.singleUser = response;
      // this.passId.userId.next();

      this.router.navigate([`preview/${id}`]);
    }, error => {
      this.errorMesage.handleError();
    });


    this.allFriendsDist = this.http.getListOfAllFriends(id, this.page, this.size).subscribe((response) => {
      this.allFriend = response;
      this.allFriends = this.allFriend.list;
    });


  };

  infiniteScrolling(id: any) {
    window.addEventListener('scroll', () => {
      console.log("scroly y " + window.scrollY)
      console.log("inner higt " + window.innerHeight)
      console.log("scroll higt " + document.documentElement.scrollHeight)

      if (window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 2) {

        this.allFriendsDist = this.http.getListOfAllFriends(id, this.page, this.size).subscribe((response) => {
          this.allFriend = response;
          this.allFriends = this.allFriend.list;
        }, error => {
          this.theEndMessage = this.errorMesage.imagesRunOut()
        });
      };

    });

  };



  get size() {
    this.sizeCount += 20
    return this.sizeCount;
  };
  get page() {
    let count = 1
    return count;
  }



  returnImgUrl(id: any) {
    this.retunrUrl(id)

    return `http://placeimg.com/640/480/animals?${id}`
  }

  retunrUrl(id?: any) {
    return `preview/${id}`
  }

  ngOnDestroy(): void {
    this.allFriendsDist.unsubscribe();
    this.singleUserDist.unsubscribe();
  };

};
