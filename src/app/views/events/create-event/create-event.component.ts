import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';
import { ImageService } from 'src/app/services/image.service.service';
import { LockService } from 'src/app/services/lock.service';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {

  form: FormGroup;
  userLogged:any;

  
  files;
  postId;

  //imagenes al servidor
  imgArray;
  slides;
  fdImg: FormData;

  //imagenes para cliente
  $base64;
  $userSubscription: Observable<any> = this.lockService.checkToken();

  @ViewChild('uploadFile',{static:false})fileInput: ElementRef;
  @ViewChild('imgWrap',{static:false})imgWrap: ElementRef;

  constructor(fb: FormBuilder,private eventService:EventsService,private toastr:ToastrService,private lockService: LockService,private imageService: ImageService){
    this.form = fb.group({
      title: ['',Validators.required],
      description: ['',Validators.required,Validators.minLength(16)],
      date: ['',[Validators.required]],
      maxPeople: ['',[Validators.required]],
      province: ['',[Validators.required]],
      street: ['',[Validators.required]],
      start: ['',[Validators.required]],
      end: ['',[Validators.required]]
    });

    this.lockService.checkToken().subscribe(res=>{
      this.userLogged = res;
    });
  }

  uploadNewEvent = () => {
    const EVENT:any = {
      uid: this.uuidv4(),
      title: this.form.value.title,
      description: this.form.value.description,
      date: this.form.value.date,
      maxPeople: this.form.value.maxPeople,
      province: this.form.value.province,
      street: this.form.value.street,
      start: this.form.value.start,
      end: this.form.value.end,
      
    };

    this.eventService.uploadEvent(EVENT).subscribe((data:any)=> {

      this.eventService.uploadEventImage(this.fdImg).subscribe(res=>{
        console.log(res);
        this.imgWrap.nativeElement.innerHTML = '';
        this.form.reset();
        console.log('Toasteando');
        this.toastr.success('La publicación se ha registrado con éxito.','¡Genial!');          
      });
      
      if (data.code === 201) {
        this.toastr.success('El evento se ha publicado con éxito.','¡Genial!',{ progressBar: true,positionClass: 'toast-top-right'});
        this.form.reset();
      }
      else {
        this.toastr.error('Oops.. Ha habido un problema al crear el evento ¡Intentalo más tarde!','Error!',{ progressBar: true,positionClass: 'toast-bottom-right'});
      }
    },(error: any) => {
      this.toastr.error('Oops.. Ha habido un problema al crear el evento ¡Intentalo más tarde!','Error!',{ progressBar: true,positionClass: 'toast-bottom-right'});
    });
  }


  
// ------------------------------------------ IMAGENES --------------------------------------

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
      let image = this.imageService.processImage(file,this.postId+'.'+this.uuidv4(), 'events.');
      
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

  uuidv4(): string {
    return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(
    /[018]/g,
    (c: number) =>
        (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
  }

}
