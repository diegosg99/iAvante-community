import { Injectable } from '@angular/core';
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

  getEvent = (id) => {
    return this.http.get(`${this.baseUrl}/get/event/`+id);
  }

  uploadEvent = (event) => {
    return this.http.post(`${this.baseUrl}/upload/event`,event);
  }

  removeEvent = (uid) => {
    return this.http.post(`${this.baseUrl}/remove/event`,{uid:uid});
  }
}
