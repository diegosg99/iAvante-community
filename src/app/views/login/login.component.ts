import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
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
    //this.userInfo();
  }

  constructor(private oauth:OauthService, private router:Router){}

  login = async () => {

    const {email,password} = this.usuario;

    this.oauth.login(email,password).then(console.log);
    this.userInfo();
  }

  loginGoogle = async () => {

    const {email,password} = this.usuario;

    this.oauth.loginWithGoogle(email,password).then(console.log);
    this.userInfo();

    //this.oauth.register(email,password).then(console.log);
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
