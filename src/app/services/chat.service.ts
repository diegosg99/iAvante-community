import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = 'http://localhost:3003/api'; // TODO IP : 10.111.249.108

  constructor(private http: HttpClient) {}

  createLobby = (lobby) => {
    return this.http.post(`${this.baseUrl}/new/lobby`, {lobby: lobby});
  }

  getLobby = () => {
    return this.http.get(`${this.baseUrl}/get/lobby`);
  }

  getUserLobbys = (uid) => {
    return this.http.get(`${this.baseUrl}/get/lobbys/`+uid);
  }

  getLobbyData = (uid) => {
    return this.http.get(`${this.baseUrl}/get/lobby/data/`+uid);
  }

  sendMessage = (message) => {
    return this.http.post(`${this.baseUrl}/send/message`,message);
  }
}
