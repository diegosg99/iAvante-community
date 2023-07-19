import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getDownloadURL,getStorage,ref,uploadBytes } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { OauthService } from './oauth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{
  
  private storage = getStorage();
  userLogged = this.auth.getUserLogged();
  userId;

  constructor(private firebase: AngularFirestore,private auth:OauthService) { }

  ngOnInit(): void {
    if(this.userLogged){
      this.userLogged.subscribe(user=>{this.userId = user});
    }
  }

  uploadUser = (user:any): any => {

    let fullUser:any = {...user};

    return this.firebase.collection('users').doc(fullUser.uid).set(fullUser)
          .then(()=>{
            console.log('Usuario registrado con éxito.')
          }, error => {
            console.log(error);
          });
  }

  getUser = (id = null):Observable<any> => {
    return this.firebase.collection('users').doc(id==null?this.userId:id).snapshotChanges();
  }

  getUsers = ():Observable<any> => {
    return this.firebase.collection('users').snapshotChanges();
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