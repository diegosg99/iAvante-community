import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getDownloadURL,getStorage,ref,uploadBytes } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = 'http://localhost:3003/api';

  constructor(private firebase: AngularFirestore, private http: HttpClient) { }

  uploadPost = (post: Post): any => {

  }

  uploadPostImage = (file:any): any => {
    return this.http.post(`${this.baseUrl}/upload/image`, file);
  }
  

  getPosts = ():Observable<any> => {
    return this.firebase.collection('posts',ref => ref.orderBy('fechaActualizacion','desc')).snapshotChanges();
  }

  getUserPosts = (userId):Observable<any> => {
    return this.firebase.collection("posts",ref=>ref.where('usuario','==',userId)).snapshotChanges();
  }

  getFollowedPosts = (followeds) => {

    return this.firebase.collection('posts',ref => ref.where('usuario', 'in', followeds)).snapshotChanges();
  }

  getPost = (id:string):any => {

    let doc;
    
    this.firebase.collection('posts').snapshotChanges().subscribe(docs=>{
      doc = docs;
    });
  }
}

