import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getDownloadURL,getStorage,ref,uploadBytes } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  private storage = getStorage();

  constructor(private firebase: AngularFirestore) { }

  postLike = (postId: string,userId:string):any => {
    this.firebase.collection('likes').add(postId)
          .then(()=>{
            console.log('Publicación subida con éxito.')
          }, error => {
            console.log(error);
          });
  }

  postBookmark = (postId: string,userId:string):any => {
    this.firebase.collection('likes').add(postId)
          .then(()=>{
            console.log('Publicación subida con éxito.')
          }, error => {
            console.log(error);
          });
  }
}