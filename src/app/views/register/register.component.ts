import { Component } from '@angular/core';
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

  constructor (private oauth:OauthService) {
    
  }

  register = () => {
    const {email,password} = this.usuario;

    this.oauth.register(email,password).then(console.log);
  }

}
