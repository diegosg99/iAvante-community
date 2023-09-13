import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })

export class LockService implements OnInit{

    private key;

    constructor(private httpService: HttpClient,private router: Router){
    }

    ngOnInit(): void {
        //this.checkToken();
    }

    checkToken = async (email) => {
        
        const token = this.getToken();

        this.httpService.post("http://127.0.0.1:3003/api/users/verifyToken",{token:token,email:email}).subscribe(data=>{
            console.log(data);
            this.router.navigate['']
        });
    }

    getToken = () => {
        return sessionStorage.getItem('jwtToken');
     }

    setToken = (token) => {
        console.log(token);
       return sessionStorage.setItem('jwtToken', token);
    }

    removeToken = () => {
       return sessionStorage.setItem('jwtToken', "");
    }
}