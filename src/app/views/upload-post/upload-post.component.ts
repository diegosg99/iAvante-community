import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/services/post.service';
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
  fdImg: FormData;
  postId;

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
    this.postId = this.uuidv4();
  }


  postArticle = () => {
      this.uploadPost();
  }

  uploadPost = () => {

    const POST: any = {
      uid: this.postId,
      title: this.form.value.titulo,
      descripcion: this.form.value.descripcion,
      categoria: this.form.value.categoria,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      usuario: this.userLogged.uid
    }

    try {

      this._postService.uploadPost(POST).subscribe((res)=> {
        console.log(res);
        console.log(this.imgArray);
        this._postService.uploadPostImage(this.fdImg).subscribe(res=>{
          console.log(res);
          this.imgWrap.nativeElement.innerHTML = '';
          this.form.reset();
          console.log('Toasteando');
          this.toastr.success('La publicación se ha registrado con éxito.','¡Genial!');          
        });
      },(error: any) => {
        this.toastr.error('Oops.. Ha habido un problema al subir la publicación ¡Intentalo más tarde!','Error!')
        console.log(error);
      });

    } catch (error) {
      console.log(error);
    }
  }

  imgUpload = async (e) => {

    this.files = e.target.files;

    let promises  = [];

    let html = "";
    let index = 0;
    this.fdImg = new FormData();

    this.imgArray = [];
    this.$base64 = [];
    this.imgWrap.nativeElement.innerHTML = html;

    Array.from(this.files).forEach((file) => {
        let image = this.imageService.processImage(file,this.postId+'.'+this.uuidv4(), 'post.');
        
        this.fdImg.append('files',image.get('file'));
        promises.push(this.imageService.getBase64(file));
    });

    this.imgArray.forEach(file=> {
      this.fdImg.append(`file${index}`,file);

      index++;
    })
    
    await Promise.all(promises).then((base64Arr) => {
      this.printImages(base64Arr);
    })
    .catch(error => console.log(`Error en las promesas ${error}`))

  }

  updateClasses = () => {

    let smallSlide = `
    height: 20vh;
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

    let elems = document.getElementsByClassName('base64Img');
    Array.from(elems).forEach(elem => {
      elem.setAttribute('style',smallSlide);
      elem.className = `base64Img slide`;
    });
  }

  bindPhotos = () => {

    let photos = document.getElementsByClassName('base64Img');
    Array.from(photos).forEach(photo => {
      photo.addEventListener('click',this.handlePhoto);
    });

    let crosses = document.getElementsByClassName('imgCross');
    Array.from(crosses).forEach(cross => {
      cross.addEventListener('click',this.deletePhoto);
    });
  }

  handlePhoto = (e) => {
    let bigSlide = `
    height: 40vh;
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
    height: 20vh;
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

    let selectedHeight = e.target.style.height;

    let photos = document.getElementsByClassName('base64Img');
    
    Array.from(photos).forEach(photo => {
      photo.setAttribute('style',smallSlide);
    });
    
    e.target.style = selectedHeight=='40vh'?smallSlide:bigSlide;    
  }

  deletePhoto = (e) => {

    let index = e.target.dataset['photo'] - 1;
    this.$base64.splice(index,1);
    this.imgArray.splice(index,1);

    let resFiles = this.fdImg.getAll('files');
    this.fdImg.delete('files');
    resFiles.splice(index,1);

    resFiles.forEach(file=>{
      this.fdImg.append('files',file);
    });

    let out = Array.from(this.files).splice(index,1);
    this.files = Array.from(this.files).filter(el=>el!==out[0]);

    this.printImages(this.$base64);
  }

  printImages = (base64Arr) => {

      let html = '';
      let imgNum = 1;
      this.$base64 = [];

      base64Arr.forEach(image => {
        this.$base64.push(image);

        html += `
        <div style="position:relative;">
          <img src='${image}' class="base64Img"/>
          <i class="fa fa-xmark imgCross" data-photo="${imgNum}" style="color:white;position:absolute;top:1em;right:1em;padding: .3em;background-color: lightgray;border-radius: 14px;"></i>
        </div>`;
        imgNum++;
    })

    this.imgWrap.nativeElement.innerHTML = html;

    this.updateClasses();
    this.bindPhotos();
  }

  uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

