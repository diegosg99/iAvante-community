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

  removeQuestion = (id) => {
    return this.firebase.collection("forums").doc(id).delete();
  }

  getQuestion = (id:string):any => {
    return this.firebase.collection("forums").doc(id);
  }

  getQuestionBy = (id:string,key:string):any => {
    return this.firebase.collection("forums",ref=>ref.where(key,'==',id)).snapshotChanges();
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
  }

  getResponsesBy = (id:string,key:string):any => {
    console.log(id);
    return this.firebase.collection("forum-response",ref=>ref.where(key,'==',id)).snapshotChanges();
  }

  //--------------------------------- NO CREO QUE HAGA FALTA ---------------------------
  // getComment = (commentId) => {
  //   return this.firebase.collection("forums-response").doc(commentId).get();
  // }

  likeResponse = (commentLike) => {

    return this.firebase.collection('forums-response-likes').add(commentLike)
    .then(()=>{
      console.log('Like con éxito.')
    }, error => {
      console.log(error);
    });
  }

  removeLikeResponse = (commentLikeId) => {
    return this.firebase.collection('forums-response-likes').doc(commentLikeId).delete()
    .then(()=>{
      console.log('Like eliminado con éxito.')
    }, error => {
      console.log(error);
    });
  }

  getLikesResponse = (commentId) => {

    return this.firebase.collection('forums-response-likes',ref=>ref.where('comment','==',commentId)).snapshotChanges();
  }
}

