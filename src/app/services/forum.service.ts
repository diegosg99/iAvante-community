import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getDownloadURL,getStorage,ref,uploadBytes } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { OauthService } from './oauth.service';
import { HttpClient } from '@angular/common/http';
import { LockService } from './lock.service';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  // userLogged = this.lockService.checkToken();
  user;

  private baseUrl = 'http://10.111.249.116:3003/api'; // TODO IP : 10.111.249.108

  constructor(private lockService:LockService,private http: HttpClient) { }

  // ngOnInit(): void {
  //   if(this.userLogged){
  //     this.userLogged.subscribe(user=>{this.user = user});
  //   }
  // }

  //-------------------------------- QUESTIONS -----------------------------

  uploadQuestion = (forum:any): any => {
    return this.http.post(`${this.baseUrl}/upload/question`, forum);
  }

  getQuestions = ():Observable<any> => {
    return this.http.get(`${this.baseUrl}/get/questions`);
  }

  getCategoryQuestions = (category):Observable<any> => {
    return this.http.get(`${this.baseUrl}/get/questions/`+category)
  }

  updateQuestionViews = (question):any => {
    question.views++;
    return this.http.post(`${this.baseUrl}/questions/update/views`, question)
  };

  removeQuestion = (id) => {
  }

  getQuestion = (id:string):any => {
    return this.http.get(`${this.baseUrl}/get/question/`+id);
  }

  getQuestionBy = (id:string,key:string):any => {
  }

  //-------------------------------- QUESTIONS -----------------------------
 
  //-------------------------------- RESPONSES -----------------------------

  uploadResponse = (response): any => {

    return this.http.post(`${this.baseUrl}/upload/comment`,response);
  }

  getResponses = (idQuestion):any => {

    return this.http.post(`${this.baseUrl}/questions/comments`,{uid:idQuestion});
  }

  getResponsesBy = (id:string,key:string):any => {
  }

  //--------------------------------- NO CREO QUE HAGA FALTA ---------------------------
  // getComment = (commentId) => {
  //   return this.firebase.collection("forums-response").doc(commentId).get();
  // }

  likeResponse = (commentLike) => {

    // return this.firebase.collection('forums-response-likes').add(commentLike)
    // .then(()=>{
    //   console.log('Like con éxito.')
    // }, error => {
    //   console.log(error);
    // });
  }

  removeLikeResponse = (commentLikeId) => {
    // return this.firebase.collection('forums-response-likes').doc(commentLikeId).delete()
    // .then(()=>{
    //   console.log('Like eliminado con éxito.')
    // }, error => {
    //   console.log(error);
    // });
  }

  getLikesResponse = (commentId) => {

    // return this.firebase.collection('forums-response-likes',ref=>ref.where('comment','==',commentId)).snapshotChanges();
  }
}

