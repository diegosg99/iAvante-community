import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StatusService implements OnInit{

  private baseUrl = 'http://217.160.232.46:3000/api'; // TODO IP : 10.111.249.108

  constructor(private httpService: HttpClient) { }

  ngOnInit(): void {}

  getStatus = (uid,table) => {

    return this.httpService.post(`${this.baseUrl}/get/status`, {uid:uid,table:table});
  }

  setStatus = (status,uid,table):any => {

    return this.httpService.post(`${this.baseUrl}/set/status`, {status:status,uid:uid,table:table});
  }
}