import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FollowService } from 'src/app/services/follow.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.component.html',
  styleUrls: ['./other-profile.component.scss']
})
export class OtherProfileComponent {

@Input() $user:Observable<any>;
@Input() $userLogged: Observable<any>;

userData:any;
userLoggedData:any;

userId = this._activatedRoute.snapshot.paramMap.get('id');

$followed: Observable<any> | any;
followed: any;

followers;
following;
$posts:Observable<any> = this.postService.getUserPosts(this.userId);

constructor(private followService:FollowService,private _activatedRoute: ActivatedRoute,private postService: PostService){}

ngOnInit(): void {
  this.$followed = this.checkFollowed();
  this.$user.subscribe(res=> {
    this.userData = res;
  });
  this.$userLogged.subscribe(res=> {
    this.userLoggedData = res;
  })
}

followUser = () => {
  return this.followService.followUser(this.userData.uid,this.userLoggedData.uid).subscribe(res=>{
    console.log(res);
    this.followed = res;
  });
}

unfollowUser = () => {
  return this.followService.unfollowUser(this.userData.uid,this.userLoggedData.uid).subscribe(res=>{
    console.log(res);
    this.followed = res;
  });
}

checkFollowed = () => {
  return this.followService.checkFollow(this.userData.uid,this.userLoggedData.uid).subscribe(res=>{
    console.log(res);
    this.followed = res;
  });
}

}
