import { Component, ElementRef,OnInit, Input, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ImageService } from 'src/app/services/image.service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss']
})
export class ProfileDataComponent implements OnInit{

  @ViewChild('photo',{static:false})fileInput: ElementRef;

  @Input() $userLogged:Observable<any>;
  userLogged:any;
  userId;
  user;
  //userForm: FormGroup;
  edit:boolean = false;
  payload;
  p;

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
    location: '',
    proffesion: '',
    jobCentre: '',
    description: '',
    photo: '',
    age: '',
    instagram: '',
    facebook: '',
    twitter: '',
    linkedin: ''
  }

  constructor(private imageService: ImageService,private toastr: ToastrService, private userService: UserService){}

  ngOnInit(): void {
    this.$userLogged.subscribe(user=>{
      this.userLogged = user;
    })
  }

  updateProfile = () => {

    const USER: any = {
      uid: this.userLogged.uid,
      username: this.userForm.username,
      fullName: this.userForm.fullName,
      location: this.userForm.location,
      proffesion: this.userForm.proffesion,
      jobCentre: this.userForm.jobCentre,
      description: this.userForm.description,
      role: 'USUARIO',
      age: this.userForm.age,
      instagram: this.userForm.instagram,
      facebook: this.userForm.facebook,
      twitter: this.userForm.twitter,
      linkedin: this.userForm.linkedin
    }
      
    console.log(USER);

    this.userService.updateUser(USER).then(()=> {
      this.toastr.success('Has actualizado tus datos.','¡Genial!');
    },(error: any) => {
      this.toastr.error('Oops.. Ha habido un problema al actualizar los datos... ¡Intentalo más tarde!','Error!')
      console.log(error);
    });
  }

  updateImage = () => {

    let file = this.imageService.processImage(this.fileInput.nativeElement.files[0],this.userLogged.uid);

    console.log(file);

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
