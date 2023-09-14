import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LockService } from 'src/app/services/lock.service';
import { OauthService } from 'src/app/services/oauth.service';
import { UserService } from 'src/app/services/user.service';

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

  token;

  ngOnInit = () =>{
    this.token = this.lockService.getToken();
    if (this.token!==""){
      this.router.navigate(['../#/home']);
    }
  }

  constructor(private oauth:OauthService, private router:Router, private lockService: LockService,private userService: UserService){}

  login = () => {

    const {email,password} = this.usuario;

    this.oauth.login(email,password).subscribe(res => {
      if (res.code === 201) {
        this.lockService.setToken(res.token);
        this.lockService.setUser(email);
        this.router.navigate(['/home']);
      }else{
        this.lockService.removeToken();
        this.lockService.removeUser();
        }
    });   
  }

  userInfo = () => {
    
  }

  logout = () => {
    this.oauth.logout();
  }
}
