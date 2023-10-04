import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-img-wrapper',
  templateUrl: './post-img-wrapper.component.html',
  styleUrls: ['./post-img-wrapper.component.scss']
})
export class PostImageUploaderComponent implements OnInit{

  slides;

  constructor(){
  }

  ngOnInit = () => {
    console.log(this.slides);  
    this.slides = document.querySelectorAll('.slide');
    console.log(this.slides);
  }

  clearActiveClasses = () => {
    this.slides.forEach((slide) => {
        slide.classList.remove('active')
    })
  }  
}
