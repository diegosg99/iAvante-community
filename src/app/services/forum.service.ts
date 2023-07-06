import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getDownloadURL,getStorage,ref,uploadBytes } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private storage = getStorage();

  constructor(private firebase: AngularFirestore) { }

  uploadQuestion = (forum): any => {

    this.firebase.collection('forums').add(forum)
          .then(()=>{
            console.log('Pregunta subida con éxito.')
          }, error => {
            console.log(error);
          });
  }

  uploadResponse = (response): any => {

    this.firebase.collection('forum-response').add(response)
      .then(()=>{
        console.log('Publicación subida con éxito.')
      }, error => {
        console.log(error);
    });
  }

  getPosts = ():Observable<any> => {
    return this.firebase.collection('forums',ref => ref.orderBy('fechaActualizacion','desc')).snapshotChanges();
  }

  getPost = (id:string):any => {

    let doc;
    
    this.firebase.collection('forums').snapshotChanges().subscribe(docs=>{
      doc = docs;
       console.log(doc);
    });
  }
}

