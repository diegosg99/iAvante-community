import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/services/post.service';
import { Post } from '../../models/Post';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-upload-post',
  templateUrl: './upload-post.component.html',
  styleUrls: ['./upload-post.component.scss']
})
export class UploadPostComponent implements OnInit{

  form: FormGroup;
  loading:boolean = false;

  imageFile: { link: string; file: any; name: string; } | any;
  imageRaw: { link: string; file: any; name: string; } | any;

  userUID:any = this.auth.getUserLogged().subscribe();

  constructor(
    fb: FormBuilder,
    private _postService:PostService,
    private toastr: ToastrService,
    private auth: OauthService
  ) {
    this.form = fb.group({
      titulo: ['',Validators.required],
      descripcion: ['',[Validators.required,Validators.minLength(16)]],
      photo: [''],
      categoria: ['',Validators.required],
    });
    this.auth.getUserLogged().subscribe(user=> {
      this.userUID = user.uid
    })

    //this.userLogged.subscribe(console.log);
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
      titulo: this.form.value.titulo,
      descripcion: this.form.value.descripcion,
      photo: this.imageFile.link,
      categoria: this.form.value.categoria,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      usuario: this.userUID
    }

    this.loading = true;

    this._postService.uploadPost(POST,this.imageRaw).then(()=> {
      //this.toastr.success('La publicación se ha registrado con éxito.','¡Genial!');
      this.form.reset();
      this.loading = false;
    },(error: any) => {
      //this.toastr.error('Oops.. Ha habido un problema al subir la publicación ¡Intentalo más tarde!','Error!')
      console.log(error);
      this.loading = false;
    });
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
