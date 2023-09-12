import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  private baseUrl = 'http://localhost:3003/api';

  constructor(private auth: AngularFireAuth,private http: HttpClient,private router:Router) { }

  register = (user:any): any => {

    return this.http.post(`${this.baseUrl}/user/register`, user).subscribe(res=> {
      console.log(res);
      console.log('Usuario actulizado con éxito.');
      this.router.navigate(['../login']);
    });
  }

  login = async (email:string, password: string) => {

    let data:any = {
      email: email,
      password:password
    }

    try {
      return this.http.post(`${this.baseUrl}/user/login`, data).subscribe((res):any=>{
        console.log(res);
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  loginWithGoogle = async (email:string, password: string) => {

    try {
      return await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  getUserLogged = () => {
    return this.auth.authState;
  }

  logout = () => {
    return this.auth.signOut();
  }
}
