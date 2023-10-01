import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/services/post.service';
import { Post } from '../../models/Post';
import { OauthService } from 'src/app/services/oauth.service';
import { UserService } from 'src/app/services/user.service';
import { ImageService } from 'src/app/services/image.service.service';
import { LockService } from 'src/app/services/lock.service';

@Component({
  selector: 'app-upload-post',
  templateUrl: './upload-post.component.html',
  styleUrls: ['./upload-post.component.scss']
})
export class UploadPostComponent implements OnInit{

  form: FormGroup;
  loading:boolean = false;
  userLogged:any;
  files = [];

  @ViewChild('photo',{static:false})fileInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private _postService:PostService,
    private toastr: ToastrService,
    private auth: OauthService,
    private imageService: ImageService,
     private userService: UserService,
     private lockService: LockService
  ) {

    this.form = this.fb.group({
      titulo: ['',Validators.required],
      descripcion: ['',[Validators.required,Validators.minLength(16)]],
      photo: this.fb.array([]),
      categoria: ['',Validators.required],
    });

    this.lockService.checkToken().subscribe(res=>{
      this.userLogged = res;
    });
  }

  ngOnInit(): void {}

  postArticle = () => {
    //if (this.id == undefined) {
      this.uploadPost();
    // }else{
    //   this.editarPost(this.id);
    // } 
  }

  uploadPost = () => {

    const POST: any = {
      uid: this.uuidv4(),
      title: this.form.value.titulo,
      descripcion: this.form.value.descripcion,
      categoria: this.form.value.categoria,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      usuario: this.userLogged.uid
    }

    try {
      let file = this.imageService.processImage(this.fileInput,this.userLogged.uid);

      console.log(file);

      POST.photo = file;

      this._postService.uploadPost(POST).then(()=> {
        this.toastr.success('La publicación se ha registrado con éxito.','¡Genial!');
        this.form.reset();
      },(error: any) => {
        this.toastr.error('Oops.. Ha habido un problema al subir la publicación ¡Intentalo más tarde!','Error!')
        console.log(error);
      });
      
    } catch (error) {
      console.log(error);
    }
  }

  // editarPost = (id:string) => {
  //   const POST: any = {
  //     titulo: this.form.value.titulo,
  //     descripcion: this.form.value.descripcion,
  //     photo: this.form.value.photo,
  //     curso: this.form.value.curso,
  //     fechaActualizacion: new Date()
  //   }

  //   this.loading = true;

  // }

  updateImage = () => {
    this.files.push(this.imageService.processImage(this.fileInput,this.userLogged.uid,'post.'));
    console.log(this.files);
  }

  uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
