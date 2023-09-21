import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { LockService } from './lock.service';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  private baseUrl = 'http://127.0.0.1:3003/api';

  constructor(private auth: AngularFireAuth,private http: HttpClient,private router:Router, private lockService: LockService) { }

  register = (user:any): any => {

    return this.http.post(`${this.baseUrl}/user/register`, user);
  }

  login = (email:string, password: string) => {

    let data:any = {
      email: email,
      password:password
    }

    console.log(data);

    try {

      return this.http.post(`${this.baseUrl}/user/login`, data);
    
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  getUserLogged = () => {
    return this.auth.authState;
  }

  logout = () => {
    this.lockService.removeToken();
    this.router.navigate(['../login']);  
  }
}