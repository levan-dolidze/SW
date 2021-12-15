import { FullUserModel } from './../models/fullUserModel';
import { UserModel } from './../models/UserModel';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class HttpService {
  urlAllUsers = environment.url;
  urlSingleUser = environment.url;
  urlAllFriends = environment.url;
  constructor(private httpService: HttpClient) { }

  getAllUsers(page: number, size: number): Observable<Array<UserModel>> {
    return this.httpService.get<Array<UserModel>>(`${this.urlAllUsers}/${page}/${size}`);
  };

  getSingleUser(id: any): Observable<FullUserModel> {
    return this.httpService.get<FullUserModel>(`${this.urlSingleUser}/${id}`)
  }

  getListOfAllFriends(userId: number, page: number, size: number): Observable<Array<UserModel>> {
    return this.httpService.get<Array<UserModel>>(`${this.urlAllFriends}/${userId}/friends/${page}/${size}`)
  }

};
