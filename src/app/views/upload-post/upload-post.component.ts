import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/services/post.service';
import { Post } from '../../models/Post';
import { OauthService } from 'src/app/services/oauth.service';
import { UserService } from 'src/app/services/user.service';
import { ImageService } from 'src/app/services/image.service.service';
import { LockService } from 'src/app/services/lock.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-post',
  templateUrl: './upload-post.component.html',
  styleUrls: ['./upload-post.component.scss']
})
export class UploadPostComponent implements OnInit{

  form: FormGroup;
  loading:boolean = false;
  userLogged:any;
  files;

  //imagenes al servidor
  imgArray;
  slides;

  //imagenes para cliente
  $base64;
  $userSubscription: Observable<any> = this.lockService.checkToken();


  @ViewChild('uploadFile',{static:false})fileInput: ElementRef;
  @ViewChild('imgWrap',{static:false})imgWrap: ElementRef;


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

    this.$userSubscription.subscribe(res=>{
      this.userLogged = res;
    });
  }

  ngOnInit(): void {

  }


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
      usuario: this.userLogged.uid,
    }

    console.log(this.files);

    try {

      this._postService.uploadPost(POST,this.files).subscribe(()=> {
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

  imgUpload = async (e) => {

    this.files = e.target.files;

    let promises  = [];

    let html = "";
    this.imgArray = [];
    this.$base64 = [];
    this.imgWrap.nativeElement.innerHTML = html;
    let imgNum = 1;


    Array.from(this.files).forEach((file) => {
        let image = this.imageService.processImage(file,this.userLogged.uid, 'post.');
        this.imgArray.push(image);

        promises.push(this.imageService.getBase64(file));
    });



    await Promise.all(promises).then((base64) => {

      let html = "";

      base64.forEach(image => {
        this.$base64.push(image);

        html += `
        <div style="position:relative;">
          <img src='${image}' class="base64Img"/>
          <i class="fa fa-xmark" class="imgCross" data-photo="${imgNum}" style="color:white;position:absolute;top:1em;right:1em;padding: .3em;background-color: lightgray;border-radius: 14px;"></i>
        </div>`;
      })

      imgNum++;
      this.imgWrap.nativeElement.innerHTML = html;

      this.updateClasses();
      this.bindPhotos();
    })
    .catch(error => console.log(`Error en las promesas ${error}`))

  }

  updateClasses = () => {

    let smallSlide = `
    height: 16vh;
    border-radius: 20px;
    margin: 10px;
    cursor: pointer;
    color: #fff;
    flex: 1;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    transition: all 0.5s ease-in-out;`

    let imgNum = 1;
    let active = ' active';

    let elems = document.getElementsByClassName('base64Img');
    Array.from(elems).forEach(elem => {
      // active = imgNum == 1? ' active':'';
      elem.setAttribute('style',smallSlide);

      elem.className = `base64Img slide`;
      // imgNum++;
    });

    //this.initSlides();
  }

  bindPhotos = () => {
    let photos = document.getElementsByClassName('base64Img');
    Array.from(photos).forEach(photo => {
      photo.addEventListener('click',this.handlePhoto);
    });
  }

  handlePhoto = (e) => {
    let bigSlide = `
    height: 36vh;
    border-radius: 20px;
    margin: 10px;
    cursor: pointer;
    color: #fff;
    flex: 1;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    transition: all 0.5s ease-in-out;`

    let smallSlide = `
    height: 16vh;
    border-radius: 20px;
    margin: 10px;
    cursor: pointer;
    color: #fff;
    flex: 1;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    transition: all 0.5s ease-in-out;`

    let photos = document.getElementsByClassName('base64Img');
    Array.from(photos).forEach(photo => {
      photo.setAttribute('style',smallSlide);
    });

    e.target.style=bigSlide;
  }

  updateImage = () => {
    this.files.push(this.imageService.processImage(this.fileInput,this.userLogged.uid,'post.'));
    console.log(this.files);
  }

  clearActiveClasses = () => {

    this.slides.forEach((slide) => {
        slide.classList.remove('active')
    })
  }

  deletePhoto = () => {
    console.log('Buenas noches');
  }

  initSlides = () => {
    this.slides = document.querySelectorAll('.slide')

    this.slides.forEach(slide => {
        slide.addEventListener('click', () => {
            this.clearActiveClasses()
            slide.classList.add('active')
        })
    })
  }

  uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

