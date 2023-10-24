import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ImageService } from 'src/app/services/image.service.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-fullPost',
  templateUrl: './full-post.component.html',
  styleUrls: ['./full-post.component.scss']
})
export class FullPostComponent implements OnInit{

  type = 'post';
  postId:any;
  post:any;

  index:any = 0;
  slideIndex:any = 1;
  slides:any;
  dots:any;

  $mediaSub: Observable<any>;
  $mediaSub2: Observable<any>;
  $mediaSub3: Observable<any>;
  $profileSub:Observable<any>;


  constructor(private _postService: PostService,private router:Router,private _activatedroute:ActivatedRoute,private imageService: ImageService){

  }

  ngOnInit(): void {
    this._activatedroute.params.subscribe((data:any) => {
      this.postId = data.id;
    });
    this._postService.getPost(this.postId).subscribe(data=>{
      this.post = data;
      this.getProfilePic();
      this.getPostMedia();
    });
  }

  getPostMedia = () => {
    let mediaArr = [this.post.media1,this.post.media2,this.post.media3].filter(media=>media!==null);

    mediaArr[0]?
      this.$mediaSub = this.imageService.getMediaPost(mediaArr[0]):null
    mediaArr[1]?
      this.$mediaSub2 = this.imageService.getMediaPost(mediaArr[1]):null;
    mediaArr[2]?
      this.$mediaSub3 = this.imageService.getMediaPost(mediaArr[2]):null
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

  getProfilePic = () => {
    console.log(this.post.user_id);
    this.$profileSub = this.imageService.getProfilePic(this.post.user_id);
  }
}