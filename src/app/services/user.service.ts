import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { getDownloadURL,getStorage,ref,uploadBytes } from '@angular/fire/storage';
import { Observable, forkJoin, map } from 'rxjs';
import { OauthService } from './oauth.service';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{
  
  private storage = getStorage();
  userId;
  userLogged;

  private baseUrl = 'http://10.111.249.116:3003/api'; // TODO IP : 10.111.249.108

  constructor(private firebase: AngularFirestore,private auth:OauthService,private http: HttpClient,private router:Router) { }

  ngOnInit(): void {
    if(this.userLogged){
      this.userLogged.subscribe(user=>{this.userId = user});
    }
  }

  uploadUser = (user:any): any => {

    return this.http.post(`${this.baseUrl}/user/register`, user).subscribe(res=> {
      console.log(res);
      console.log('Usuario actulizado con éxito.');
      this.router.navigate(['../login']);
    });
  }
  
  updateUser = (user:any): any => {
    return this.http.post(`${this.baseUrl}/user/update`, user).subscribe(res=> {
      console.log('Usuario actulizado con éxito.');
    });
  }
  
  updateImage = (file:any): any => {
    return this.http.post(`${this.baseUrl}/upload/image`, file);
  }
  

  getUser = (id):any => {
    return this.http.get(`${this.baseUrl}/user/`+id);
  }

  getUserByEmail = (email = null):Observable<any> => {
    return this.http.get(`${this.baseUrl}/user/email/${email}`)
  }

  getUsers = ():Observable<any> => {
    return this.http.get(`${this.baseUrl}/users`);
  }

  getCategoryQuestions = (category):Observable<any> => {
    return this.firebase.collection('users',ref => ref.where('categoria','==',category)).snapshotChanges();
  }

  updateQuestionViews = (id,question) => {
    question.views++
    return this.firebase.collection("users").doc(id).set({...question});
  }

  getQuestion = (id:string):any => {
    return this.firebase.collection("forums").doc(id);
  }
}