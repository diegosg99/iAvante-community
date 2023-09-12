import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  usuario = {
    email: '',
    password: ''
  }

  ngOnInit = async () =>{
  }

  constructor(private oauth:OauthService, private router:Router){}

  login = async () => {

    const {email,password} = this.usuario;

    console.log(email,password);

    this.oauth.login(email,password).then(res => {
      console.log(res);
      if (res.code === 201) {
        this.router.navigate(['../home']);
      }else{
        this.router.navigate(['../login']);
      }
    });
  }

  userInfo = () => {
    this.oauth.getUserLogged().subscribe(
      res => {
        if (res?.email) {
          this.router.navigate(['home']);
        }else{
          this.router.navigate(['login']);
        }
        return res?.email;
      }
    );
  }

  logout = () => {
    this.oauth.logout().then(console.log);
  }
}
