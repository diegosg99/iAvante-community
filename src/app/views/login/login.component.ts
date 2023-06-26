import { Component } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  usuario = {
    email: '',
    password: ''
  }

  constructor(private oauth:OauthService){}

  login = async () => {

    const {email,password} = this.usuario;

    this.oauth.login(email,password).then(console.log);

    //this.oauth.register(email,password).then(console.log);
  }

  loginGoogle = async () => {

    const {email,password} = this.usuario;

    this.oauth.loginWithGoogle(email,password).then(console.log);

    //this.oauth.register(email,password).then(console.log);
  }

  userInfo = () => {
    this.oauth.getUserLogged().subscribe(
      res => {
        console.log(res?.email);
      }
    );
  }

  logout = () => {
    this.oauth.logout().then(console.log);
  }
 
}
