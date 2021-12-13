import { UserModel } from './../models/UserModel';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class HttpService {
  urlAllUsers = environment.allUsers;
  constructor(private httpService: HttpClient) { }

  getAllUsers(): Observable<Array<UserModel>> {
    return this.httpService.get<Array<UserModel>>(`${this.urlAllUsers}/${1}/${20}`);
  };

};
