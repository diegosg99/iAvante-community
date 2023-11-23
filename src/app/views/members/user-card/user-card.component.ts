import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FollowService } from 'src/app/services/follow.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit{

  @Input() user;
  @Input() userLogged;

  $followed: Observable<any> | any;
  followed: any;

  followers;
  following;
  posts;

  constructor(private followService:FollowService){}

  ngOnInit(): void {
    this.$followed = this.checkFollowed();
  }

  followUser = () => {
    return this.followService.followUser(this.user.uid,this.userLogged.uid).subscribe(res=>{
      console.log(res);
      this.followed = res;
    });
  }

  unfollowUser = () => {
    return this.followService.unfollowUser(this.user.uid,this.userLogged.uid).subscribe(res=>{
      console.log(res);
      this.followed = res;
    });
  }

  checkFollowed = () => {
    return this.followService.checkFollow(this.user.uid,this.userLogged.uid).subscribe(res=>{
      console.log(res);
      this.followed = res;
    });
  }

  // getPosts = () => {
  //   this.postService.getUserPosts(this.user.uid).subscribe((res:any) => {
  //     console.log(res);
  //     this.posts = res.length;
  //   });
  // }
}
