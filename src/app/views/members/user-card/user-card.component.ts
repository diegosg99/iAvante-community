import { Component, Input, OnInit } from '@angular/core';
import { FollowService } from 'src/app/services/follow.service';
import { OauthService } from 'src/app/services/oauth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit{

  followed;
  @Input() user;
  @Input() userLogged;
  // userLogged = this.auth.getUserLogged();
  userId;

  followers;
  following;
  posts;

  constructor(private auth:OauthService, private followService:FollowService,private postService: PostService){}

  ngOnInit(): void {
    console.log(this.user);
    console.log(this.userLogged);
  }

  followUser = (userId) => {
    console.log('Previo:')
    console.log(this.followed);
    this.followed?
      this.followed = this.followService.unfollowUser(userId,this.userId):
      this.followed = this.followService.followUser(userId,this.userId);
    console.log(this.followed);
  }

  checkFollowed = () => {
    this.followService.checkFollow(this.user.uid,this.userId).subscribe(res=>{
      res.length == 0 ? this.followed = false : this.followed = true;
    });
  }

  // getPosts = () => {
  //   this.postService.getUserPosts(this.user.uid).subscribe((res:any) => {
  //     console.log(res);
  //     this.posts = res.length;
  //   });
  // }
}
