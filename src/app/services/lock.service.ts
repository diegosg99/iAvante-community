import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

export class LockService implements OnInit{

    private key;

    constructor(private httpService: HttpClient,private router: Router){
    }

    ngOnInit(): void {}

    checkToken = ():Observable<any> => {
        
        const token = this.getToken();

        return this.httpService.post("http://127.0.0.1:3003/api/user/verifyToken",{token:token});   
    }

    getToken = () => {
        return sessionStorage.getItem('jwtToken');
     }

    getUser = () => {
        return sessionStorage.getItem('email');
    }

    setToken = (token) => {
       return sessionStorage.setItem('jwtToken', token);
    }

    setUser = (email) => {
        return sessionStorage.setItem('email', email);
     }

    removeToken = () => {
        sessionStorage.setItem('jwtToken', "");
        sessionStorage.setItem('email', "");
    }
  
    removeUser = () => {
        return sessionStorage.setItem('email', "");
    }
}