import { HttpClient } from "@angular/common/http";
import { OnInit } from "@angular/core";
import { Router } from "@angular/router";

class lockService implements OnInit{

    private key;

    constructor(private httpService: HttpClient,private router: Router){
    }

    ngOnInit(): void {
        this.checkToken();
    }

    checkToken = async () => {
        if (localStorage.getItem('token')){
            const token = localStorage.getItem('token');

            const json = await this.httpService.post("http://127.0.0.1:3003/verify",{token:token});
            const data = JSON.parse(json);
            if (data.sub){
                this.key = data.sub;
                return this.key;
            }
        }    
        else{
            window.location.hash = 'login';
        }
    }
}