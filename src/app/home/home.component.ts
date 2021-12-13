import { UserModel } from './../models/UserModel';
import { HttpService } from './../services/http.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {


  allUsers: Array<UserModel> = [];
  allUser: any;
  allUsersDistr: Subscription;
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.returnAllUsers();

  };


  returnAllUsers() {
    this.allUsersDistr = this.http.getAllUsers().subscribe((response) => {
      this.allUser = response;
      this.allUsers = this.allUser.list;

    });

  };


  ngOnDestroy(): void {
    this.allUsersDistr.unsubscribe();

  };

};
