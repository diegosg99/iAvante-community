import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { OauthService } from 'src/app/services/oauth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  userLogged = this.auth.getUserLogged();
  userId;
  user;
  //userForm: FormGroup;

  imageFile: { link: string; file: any; name: string; } | any;
  imageRaw: { link: string; file: any; name: string; } | any;

  formEdit = {
    realName:false,
    username:false,
    job:false,
    desc:false
  }

  userForm = {
    username: '',
    fullName: '',
    proffesion: '',
    photo: '',
    age: '',
    instagram: '',
    facebook: '',
    twitter: '',
    linkedin: ''
  }

  constructor(private auth:OauthService,private userService:UserService,private toastr: ToastrService,private router:Router,private _activatedroute:ActivatedRoute){}

  ngOnInit(): void {
    this.userId = this._activatedroute.params.subscribe(data=>
      {
        
        this.userId = data['id'];
        this.userService.getUser(this.userId).subscribe(user=>{
          this.user = {...user.payload._delegate._document.data.value.mapValue.fields};
          console.log(this.user);
        })
      });
    
  }

  updateProfile = () => {

    let userID;
    this.auth.getUserLogged().subscribe(user=> {
      userID = user.uid
      
      const USER: any = {
        uid: userID,
        username: this.userForm.username,
        fullName: this.userForm.fullName,
        proffesion: this.userForm.proffesion,
        role: 'USUARIO',
        photo: this.imageFile.link,
        age: this.userForm.age,
        instagram: this.userForm.instagram,
        facebook: this.userForm.facebook,
        twitter: this.userForm.twitter,
        linkedin: this.userForm.linkedin
      }
    
        this.userService.uploadUser(USER,this.imageRaw).then(()=> {
          this.toastr.success('La publicación se ha registrado con éxito.','¡Genial!');
        },(error: any) => {
          this.toastr.error('Oops.. Ha habido un problema al subir la publicación ¡Intentalo más tarde!','Error!')
          console.log(error);
        });
    });
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
