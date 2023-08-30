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
  userLogged = this.auth.getUserLogged();
  userId;
  followers;
  following;

  constructor(private auth:OauthService, private followService:FollowService,private postService: PostService){}

  ngOnInit(): void {
    this.userLogged.subscribe(user=>{
      this.userId = user.uid;

      this.followed = this.checkFollowed();

      this.followService.getUserFollows(this.user.uid).subscribe((data:any)=>{
        this.following = data.length;
      });
      
      this.followService.getUserFollowers(this.user.uid).subscribe((data:any)=>{
        this.followers = data.length;
      });
    }); 
  }

  followUser = (userId) => {
    this.followed?this.followService.unfollowUser(userId,this.userId):this.followed = this.followService.followUser(userId,this.userId);
  }

  checkFollowed = () => {
    this.followService.checkFollow(this.user.uid,this.userId).subscribe(res=>{
      res.length == 0 ? this.followed = false : this.followed = true;
    });
  }
}
