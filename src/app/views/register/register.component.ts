import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ImageService } from 'src/app/services/image.service.service';
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

  @ViewChild('photo',{static:false})fileInput: ElementRef;


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

  constructor (private oauth:OauthService,private userService: UserService, private imageService:ImageService, private router:Router) {    
  }

  ngOnInit(): void {
  }

  register = async () => {
    const {email,password} = this.usuario;
    const {username,fullName,age,photo} = this.userForm;

    this.userData = new User(this.generateUid(),email,password,username,fullName,age,photo);
    this.oauth.register(this.userData).subscribe(res=> {

      let file = this.imageService.processImage(this.fileInput,res.data.uid);
    
      this.userService.updateImage(file).subscribe((res)=> {
        console.log('Usuario actulizado con éxito.');
        console.log(res);
        this.router.navigate(['../login']);
      },(error: any) => {
        console.log(error);
      });
    });;
  }


  generateUid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
