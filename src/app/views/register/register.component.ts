import { Component, OnInit } from '@angular/core';
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
  imageBase64:any;

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

  constructor (private oauth:OauthService) {
    
  }

  ngOnInit(): void {
  }

  register = async () => {
    const {email,password} = this.usuario;
    const {username,fullName,age} = this.userForm;

    this.userData = new User(this.generateUid(),email,password,username,fullName,age,this.imageBase64);

    this.oauth.register(this.userData);
  }

  imagePreview = (event):any => {    
    this.imageRaw =event.target.files[0];

      if (this.imageRaw) {
        const reader = new FileReader();

        reader.onload = (_event: any) => {
          this.imageBase64 = _event.target.result;
        };
        reader.readAsDataURL(this.imageRaw);
      }
  }

  generateUid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
