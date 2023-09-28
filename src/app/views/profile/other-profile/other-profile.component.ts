import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FollowService } from 'src/app/services/follow.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.component.html',
  styleUrls: ['./other-profile.component.scss']
})
export class OtherProfileComponent {

@Input() user;
@Input() userLogged;

$followed: Observable<any> | any;
followed: any;

followers;
following;
posts;

constructor(private followService:FollowService,private postService: PostService){}

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

}
