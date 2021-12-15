import { PassIdService } from './../services/pass-id.service';
import { UserModel } from './../models/UserModel';
import { FullUserModel } from './../models/fullUserModel';
import { HttpService } from './../services/http.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css', '../common-css.css']
})

export class PreviewComponent implements OnInit, OnChanges {
  allFriends: Array<UserModel> = [];
  allFriend: any;
  navLink: any;
  constructor(private activatedRoute: ActivatedRoute, private http: HttpService, private router: Router, private passId: PassIdService) { }
  singleUser: FullUserModel;
  ngOnInit(): void {

    const userid = this.activatedRoute.snapshot.paramMap.get('id');
    this.getListOfAllFriends(userid);

    this.http.getSingleUser(userid).subscribe((response) => {
      this.singleUser = response;

    });


  };
  ngOnChanges(changes: SimpleChanges): void {

    console.log(changes)
  }

  getListOfAllFriends(userid: any) {
    this.http.getListOfAllFriends(userid, 1, 20).subscribe((response) => {
      this.allFriend = response;
      this.allFriends = this.allFriend.list;

    });
  };
  changeFriend(id: any) {
    this.returnImgUrl(id)
    this.http.getSingleUser(id).subscribe((response) => {
      this.singleUser = response;
      // this.passId.userId.next();
      this.router.navigate([`preview/${id}`])
    });



  }
  returnImgUrl(id: any) {

    return `http://placeimg.com/640/480/animals?${id}`
  }

};
