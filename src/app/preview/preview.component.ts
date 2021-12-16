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
  sizeCount: number = 0;
  // theEndMessage: string;
  allFriendsDist: Subscription;
  singleUserDist: Subscription;
  link: any;
  constructor(private activatedRoute: ActivatedRoute, private http: HttpService, private router: Router, private errorMesage: ErrorMessagesService) { }

  ngOnInit(): void {
    this.returnUserId;
    this.infiniteScrolling(this.returnUserId);
    this.getListOfAllFriends(this.returnUserId, this.page, 20);
    this.getSingleUser(this.returnUserId);
  };

  get returnUserId() {
    return this.activatedRoute.snapshot.paramMap.get('id');
  };
  get size() {
    this.sizeCount += 20;
    return this.sizeCount;
  };
  get page() {
    let pageCount = 1;
    return pageCount;
  };


  getSingleUser(userid: any) {
    this.singleUserDist = this.http.getSingleUser(userid).subscribe((response) => {
      this.singleUser = response;
    }, error => {
      this.errorMesage.handleError();
    });
  };


  getListOfAllFriends(userid: any, page: number, size: number) {
    this.allFriendsDist = this.http.getListOfAllFriends(userid, page, size).subscribe((response) => {
      this.allFriend = response;
      this.allFriends = this.allFriend.list;

    });
  };


  changeFriend(userid: any) {
    // this.returnImgUrl(userid)
    this.getSingleUser(userid);
    this.getListOfAllFriends(userid, this.page, 20);

  };

  infiniteScrolling(userId: any) {
    window.addEventListener('scroll', () => {
      // console.log("scroly y " + window.scrollY)
      // console.log("inner higt " + window.innerHeight)
      // console.log("scroll higt " + document.documentElement.scrollHeight)

      if (window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 10) {
        this.getListOfAllFriends(userId, this.page, this.size)
      };
    });

  };


  returnImgUrl(id: any) {
    this.retunrUrl(id)
    return `http://placeimg.com/640/480/animals?${id}`
  };

  returnLink(id?: any) {
    return `/preview/${id}`
  }


  retunrUrl(id?: any) {
    return `preview/${id}`
  };

  ngOnDestroy(): void {
    this.allFriendsDist.unsubscribe();
    this.singleUserDist.unsubscribe();
  };

};
