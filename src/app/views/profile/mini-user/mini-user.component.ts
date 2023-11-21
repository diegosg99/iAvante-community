import { Component, Input, OnInit } from '@angular/core';
import { FollowService } from 'src/app/services/follow.service';

@Component({
  selector: 'app-mini-user',
  templateUrl: './mini-user.component.html',
  styleUrls: ['./mini-user.component.scss']
})
export class MiniUserComponent implements OnInit{

  @Input() user;
  @Input() userLogged;

  followed;
  $followed;

  constructor(private followService: FollowService) {}

  ngOnInit(): void {
    console.log(this.user);
    console.log(this.userLogged);
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
}
