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
  $profileSub:Observable<any>;

  constructor(private _postService: PostService,private imageService:ImageService,private _activatedroute:ActivatedRoute, private userService: UserService){
  }

  ngOnInit(): void {
    //this.postId = this._activatedroute.params;

    console.log(this.post);

    //this.getPostUser();
    this.getProfilePic();
  }

  getPostUser = () => {
    this.$userSub = this.userService.getUser(this.post.user_id);
  }

  getPostMedia = () => {
    //this.$mediaSub = this.imageService.getMedia(this.post.media1);
  }

  getProfilePic = () => {
    console.log(this.post.user_id);
    this.$profileSub = this.imageService.getProfilePic(this.post.user_id);
  }
}
