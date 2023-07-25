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

  imageFile: { link: string; file: any; name: string; } | any;
  imageRaw: { link: string; file: any; name: string; } | any;

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

        console.log(response);

        this.userData = new User(response.user.multiFactor.user.uid,email,username,fullName,age,photo);

        console.log(this.userData)
        this.userService.uploadUser(this.userData,this.imageRaw).then(res=>{

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

  imagePreview = (event: any) => {

    if (event.target.files && event.target.files[0]) {
      this.imageRaw = event.target.files[0];

      const reader = new FileReader();

      reader.onload = (_event: any) => {
          this.imageFile = {
              link: _event.target.result,
              file: event.srcElement.files[0],
              name: event.srcElement.files[0].name
          };
      };
      reader.readAsDataURL(event.target.files[0]);
  }
  }
}
