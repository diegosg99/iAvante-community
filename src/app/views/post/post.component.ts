import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ImageService } from 'src/app/services/image.service.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{

  @Input() post:any;
  postId:any;
  postUser:any;

  index:any = 0;
  slideIndex:any = 1;
  slides:any;
  dots:any;

  $userSub:Observable<any>;
  $mediaSub:Observable<any>;
  $mediaSub2:Observable<any>;
  $mediaSub3:Observable<any>;
  $profileSub:Observable<any>;

  constructor(private _postService: PostService,private imageService:ImageService,private _activatedroute:ActivatedRoute, private userService: UserService){
  }

  ngOnInit(): void {
    this.getProfilePic();
    this.getPostMedia();
    // this.initSlides();
  }

  getPostUser = () => {
    this.$userSub = this.userService.getUser(this.post.user_id);
  }

  getPostMedia = () => {

    console.log(this.post);

    let mediaArr = [this.post.media1,this.post.media2,this.post.media3].filter(media=>media!==null);

    console.log(mediaArr[1]);

    mediaArr[0]?
      this.$mediaSub = this.imageService.getMediaPost(mediaArr[0]):null
    mediaArr[1]?
      this.$mediaSub2 = this.imageService.getMediaPost(mediaArr[1]):null;
    mediaArr[2]?
      this.$mediaSub3 = this.imageService.getMediaPost(mediaArr[2]):null
  }

  getProfilePic = () => {
    console.log(this.post.user_id);
    this.$profileSub = this.imageService.getProfilePic(this.post.user_id);
  }

  slidePhoto = (move) => {

    console.log(this.post);

    let photos = document.getElementsByClassName('post-image-'+this.post.uid);

    photos[this.index].classList.add('hide');
    photos[this.index].classList.remove('show');

    move==='back'?this.index--:this.index++;

    this.index<0?this.index=0:this.index;
    this.index>photos.length-1?this.index=photos.length-1:this.index;

    photos[this.index].classList.add('show');
    photos[this.index].classList.remove('hide');  

    console.log(photos);
  }


// initSlides = () => {
// this.slides = document.getElementsByClassName("slide");
// this.dots = document.getElementsByClassName("dot");
// this.showSlides(this.slideIndex);
// }

// // Function to show a specific slide
// showSlides = (n) => {
//   console.log(n);
//   if (n > this.slides.length) {
//     this.slideIndex = 1;
//   }
//   if (n < 1) {
//     this.slideIndex = this.slides.length;
//   }

//   // Hide all slides
//   for (let i = 0; i < this.slides.length; i++) {
//     this.slides[i].style.display = "none";
//   }

//   // Remove the "active" class from all dots
//   for (let i = 0; i < this.dots.length; i++) {
//     this.dots[i].className = this.dots[i].className.replace(" active", "");
//   }

//   // Display the current slide and mark its corresponding dot as active
//   this.slides[this.slideIndex - 1].style.display = "block";
//   this.dots[this.slideIndex - 1].className += " active";
// }

// // Function to advance to the next slide
// plusSlides = (n) => {
//   this.showSlides((this.slideIndex = this.slideIndex + n));
// }

// // Function to navigate to a specific slide
// currentSlide = (n) => {
//   this.showSlides((this.slideIndex = n));
// }
}