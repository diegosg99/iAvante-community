import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image.service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss']
})
export class ProfileDataComponent {

  @Input() userLogged:any;
  userId;
  user;
  //userForm: FormGroup;
  edit:boolean = false;
  payload;
  p;

  @ViewChild('photo',{static:false})fileInput: ElementRef;

  factory;
  category;

  ROLES = {
    user: 'USUARIO',
    admin: 'ADMIN',
    docent: 'DOCENTE'
  }

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
    jobCentre: '',
    photo: '',
    age: '',
    instagram: '',
    facebook: '',
    twitter: '',
    linkedin: ''
  }

  constructor(private imageService: ImageService,private toastr: ToastrService, private userService: UserService){}

  updateProfile = () => {

    let file = this.imageService.processImage(this.fileInput,this.userLogged.uid);

    const USER: any = {
      uid: this.userLogged.uid,
      username: this.userForm.username,
      fullName: this.userForm.fullName,
      proffesion: this.userForm.proffesion,
      jobCentre: this.userForm.jobCentre,
      role: 'USUARIO',
      photo: file,
      age: this.userForm.age,
      instagram: this.userForm.instagram,
      facebook: this.userForm.facebook,
      twitter: this.userForm.twitter,
      linkedin: this.userForm.linkedin
    }
      
    console.log(USER);

    this.userService.updateUser(USER).then(()=> {
      this.toastr.success('La publicación se ha registrado con éxito.','¡Genial!');
    },(error: any) => {
      this.toastr.error('Oops.. Ha habido un problema al subir la publicación ¡Intentalo más tarde!','Error!')
      console.log(error);
    });
  }

  updateImage = () => {

    let file = this.imageService.processImage(this.fileInput,this.userLogged.uid);
    
    this.userService.updateImage(file).subscribe((res)=> {
      console.log(res);
    },(error: any) => {
      console.log(error);
    });
  }

  hide = () => {
    this.edit = this.edit?false:true;
  }

}
