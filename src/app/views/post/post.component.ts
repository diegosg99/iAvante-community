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

  $userSub:Observable<any>;
  $mediaSub:Observable<any>;
  $mediaSub2:Observable<any>;
  $mediaSub3:Observable<any>;
  $profileSub:Observable<any>;

  constructor(private _postService: PostService,private imageService:ImageService,private _activatedroute:ActivatedRoute, private userService: UserService){
  }

  ngOnInit(): void {
    //this.postId = this._activatedroute.params;

    console.log(this.post);

    //this.getPostUser();
    this.getProfilePic();
    this.getPostMedia();
  }

  getPostUser = () => {
    this.$userSub = this.userService.getUser(this.post.user_id);
  }

  getPostMedia = () => {

    let mediaArr = [this.post.media1,this.post.media2,this.post.media3].filter(media=>media!==null);

    console.log(mediaArr);

    this.$mediaSub = this.imageService.getMediaPost(mediaArr[0]);
    mediaArr[1]?
      this.$mediaSub2 = this.imageService.getMediaPost(mediaArr[1]):null;
    mediaArr[2]?
      this.$mediaSub3 = this.imageService.getMediaPost(mediaArr[2]):null
  }

  getProfilePic = () => {
    console.log(this.post.user_id);
    this.$profileSub = this.imageService.getProfilePic(this.post.user_id);
  }
}
