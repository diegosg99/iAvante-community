import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-like-bookmark',
  templateUrl: './like-bookmark.component.html',
  styleUrls: ['./like-bookmark.component.scss']
})
export class LikeBookmarkComponent implements OnInit{

  postId;
  userId;
  user;

  liked:boolean;
  bookmarked:boolean;

  constructor(private _activatedroute:ActivatedRoute,private authService:OauthService){}

  ngOnInit(): void {
    let ruta:any = this._activatedroute.params;
    this.postId = ruta.value.id;

    this.authService.getUserLogged().subscribe(user=> 
      {
        this.user = user;
        this.userId = user.uid;
      });
  }

  likePost = () => {
    this.liked = this.liked?false:true;
  }

  bookmarkPost = () => {
    this.bookmarked = this.bookmarked?false:true;
  }
}
