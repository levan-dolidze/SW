import { ErrorMessagesService } from './../services/error-messages.service';
import { Subscription } from 'rxjs';
import { UserModel } from './../models/UserModel';
import { FullUserModel } from './../models/fullUserModel';
import { HttpService } from './../services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css', '../common-css.css']
})

export class PreviewComponent implements OnInit, OnDestroy {
  allFriends: Array<UserModel> = [];
  allFriend: any;
  singleUser: FullUserModel;
  sizeCount: number = 0;
  allFriendsDist: Subscription;
  singleUserDist: Subscription;

  linkArr: Array<any> = []
  constructor(private activatedRoute: ActivatedRoute, private http: HttpService, private errorMesage: ErrorMessagesService, private route: Router) { }

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
    this.getSingleUser(userid.id);
    console.log(userid)
    this.route.navigate([`preview/${userid.id}`])
    this.getListOfAllFriends(userid.id, this.page, 20);
    this.linkArr.push(userid);

  };

  infiniteScrolling(userId: any) {
    window.addEventListener('scroll', () => {
      if (window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 10) {
        this.getListOfAllFriends(userId, this.page, this.size)
      };
    });
  };


  returnImgUrl(id: any) {

    return `${this.singleUser.imageUrl}?${id}`
  };


  navigateFromLink(param: any) {
    this.getSingleUser(param.id);
    this.getListOfAllFriends(param.id, this.page, 20);
  };

  ngOnDestroy(): void {
    this.allFriendsDist.unsubscribe();
    this.singleUserDist.unsubscribe();
  };

};
