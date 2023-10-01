import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ImageService } from 'src/app/services/image.service.service';

@Component({
  selector: 'app-post-image-uploader',
  templateUrl: './post-image-uploader.component.html',
  styleUrls: ['./post-image-uploader.component.scss']
})
export class PostImageUploaderComponent implements OnInit{

  imgWrap = "";
  imgArray = [];
  iterator = 0;

  @Input() userLogged;

  @ViewChild('photo',{static:false})fileInput: ElementRef;


  constructor(private imageService: ImageService){}

  ngOnInit = () => {
  }


  imgUpload = (e) => {

    let file = this.imageService.processImage(this.fileInput,this.userLogged.uid, 'post.');

    console.log(e);
    
    let reader = new FileReader();
    
    reader.onload = (e) => {
      console.log(e);
      let html = "<div class='upload__img-box'><div style='background-image: url(" + e.target.result + ")' class='img-bg'><div class='upload__img-close'></div></div></div>";
      this.imgWrap = html;
      this.iterator++;
    }
  }
}
