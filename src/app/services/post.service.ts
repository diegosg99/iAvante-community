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

  private baseUrl = 'http://217.160.232.46:3000/api'; // TODO IP : 10.111.249.108

  constructor(private firebase: AngularFirestore, private http: HttpClient) { }

  uploadPost = (post: Post): any => {
    return this.http.post(`${this.baseUrl}/post/upload`, post);
  }

  uploadPostImage = (files:any): any => {
    console.log(files);
    return this.http.post(`${this.baseUrl}/post/upload/media`, files);
  }

  getUserPosts = (userId):Observable<any> => {
    return this.http.post(`${this.baseUrl}/user/posts`, {uid:userId});
  }

  getFollowedPosts = (followeds):Observable<any> => {

    return this.http.post(`${this.baseUrl}/get/followed/posts`, followeds);
  }

  getFollowedsPosts = (uid) => {
    return this.http.post(`${this.baseUrl}/get/followed/posts`, {uid:uid});
  }

  getPost = (id:string):any => {
    return this.http.post(`${this.baseUrl}/get/post`, {uid:id});
  }

  deletePost = (id:string):any => {
    console.log('cocacolastic');
    console.log(id);
    return this.http.post(`${this.baseUrl}/delete/post`, {uid:id});
  }
}

