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

  private baseUrl = 'http://10.111.249.116:3003/api'; // TODO IP : 10.111.249.108

  constructor(private firebase: AngularFirestore, private http: HttpClient) { }

  uploadPost = (post: Post): any => {
    return this.http.post(`${this.baseUrl}/post/upload`, post);
  }

  uploadPostImage = (files:any): any => {
    console.log(files);
    return this.http.post(`${this.baseUrl}/post/upload/media`, files);
  }
  

  getPosts = ():Observable<any> => {
    return this.firebase.collection('posts',ref => ref.orderBy('fechaActualizacion','desc')).snapshotChanges();
  }

  getUserPosts = (userId):Observable<any> => {
    return this.firebase.collection("posts",ref=>ref.where('usuario','==',userId)).snapshotChanges();
  }

  getFollowedPosts = (followeds):Observable<any> => {

    return this.http.post(`${this.baseUrl}/get/followed/posts`, followeds);
  }

  getFollowedsPosts = (uid) => {
    return this.http.post(`${this.baseUrl}/get/followed/posts`, {uid:uid});
  }

  getPost = (id:string):any => {

    let doc;
    
    this.firebase.collection('posts').snapshotChanges().subscribe(docs=>{
      doc = docs;
    });
  }
}

