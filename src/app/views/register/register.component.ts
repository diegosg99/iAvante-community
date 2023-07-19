import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { OauthService } from 'src/app/services/oauth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  usuario = {
    email: '',
    password: ''
  }

  userForm = {
    username: '',
    fullName: '',
    photo: '',
    age: ''
  }

  userData:User;

  constructor (private oauth:OauthService,private userService: UserService,private router:Router) {
    
  }

  ngOnInit(): void {
  }

  register = () => {
    const {email,password} = this.usuario;
    const {username,fullName,photo,age} = this.userForm;
    
    this.oauth.register(email,password).then(

      (response:any) => {

        this.userData = new User(response.user.multiFactor.user.uid,email,username,fullName,age,photo);

        console.log(this.userData)
        this.userService.uploadUser(this.userData).then(res=>{

          this.oauth.logout();
          this.router.navigate(['login']);
          console.log(response.user.multiFactor.user.email);
        });
        }
      //}
    );
  }

  createUserDB = () => {

    
  }
}
