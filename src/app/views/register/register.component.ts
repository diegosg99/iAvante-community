import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  usuario = {
    email: '',
    password: ''
  }

  constructor (private oauth:OauthService,private router:Router) {
    
  }

  register = () => {
    const {email,password} = this.usuario;

    this.oauth.register(email,password).then(
      (response:any) => {
        this.oauth.logout();
        this.router.navigate(['login']);
        console.log(response.user.multiFactor.user.email);
      }
    );
  }

}
