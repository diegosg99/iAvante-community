import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getDownloadURL,getStorage,ref,uploadBytes } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private baseUrl = 'http://localhost:3003/api'; // TODO IP : 10.111.249.108

  constructor(private http: HttpClient) { }

  getAllEvents = () => {
    return this.http.get(`${this.baseUrl}/get/events`);
  }

  uploadEvent = (event) => {
    return this.http.post(`${this.baseUrl}/upload/event`,event);
  }

  removeEvent = (uid) => {
    return this.http.post(`${this.baseUrl}/remove/event`,{uid:uid});
  }
}
