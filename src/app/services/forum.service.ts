import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getDownloadURL,getStorage,ref,uploadBytes } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { OauthService } from './oauth.service';

@Injectable({
  providedIn: 'root'
})
export class ForumService implements OnInit{

  private storage = getStorage();
  userLogged = this.auth.getUserLogged();
  userId;

  constructor(private firebase: AngularFirestore,private auth:OauthService) { }

  ngOnInit(): void {
    if(this.userLogged){
      this.userLogged.subscribe(user=>{this.userId = user});
    }
  }

  //-------------------------------- QUESTIONS -----------------------------

  uploadQuestion = (forum:any): any => {
    return this.firebase.collection('forums').add(forum)
          .then(()=>{
            console.log('Pregunta subida con éxito.')
          }, error => {
            console.log(error);
          });
  }

  getQuestions = ():Observable<any> => {
    return this.firebase.collection('forums',ref => ref.orderBy('fechaCreacion','desc')).snapshotChanges();
  }

  getCategoryQuestions = (category):Observable<any> => {
    return this.firebase.collection('forums',ref => ref.where('categoria','==',category)).snapshotChanges();
  }

  updateQuestionViews = (id,question) => {
    question.views++
    return this.firebase.collection("forums").doc(id).set({...question});
  }

  getQuestion = (id:string):any => {
    return this.firebase.collection("forums").doc(id);
  }

  //-------------------------------- QUESTIONS -----------------------------
 
  //-------------------------------- RESPONSES -----------------------------

  uploadResponse = (response): any => {

    return this.firebase.collection('forum-response').add(response)
      .then(()=>{
        console.log('Publicación subida con éxito.')
      }, error => {
        console.log(error);
    });
  }

  getResponses = (idQuestion):any => {

    return this.firebase.collection("forum-response",ref=>ref.where('preguntaId','==',idQuestion.toString())).snapshotChanges();
    //return this.firebase.collection('forum-response',ref => ref.orderBy('fechaCreacion','desc')).snapshotChanges();
  }
}

