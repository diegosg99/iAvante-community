import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { FollowService } from 'src/app/services/follow.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.component.html',
  styleUrls: ['./other-profile.component.scss']
})
export class OtherProfileComponent implements OnInit{

@Input() $user:Observable<any>;
@Input() $userLogged: Observable<any>;

//$lobbys:Observable<any>;

userData:any;
userLoggedData:any;

userId = this._activatedRoute.snapshot.paramMap.get('id');

$followed: Observable<any> | any;
followed: any;

followers;
following;

constructor(private followService:FollowService,private _activatedRoute: ActivatedRoute,private postService: PostService,private chatService: ChatService){}

ngOnInit(): void {
  this.$user.subscribe(res=> {
    this.userData = res;
  });
  this.$userLogged.subscribe(res=> {
    this.userLoggedData = res;
    this.$followed = this.checkFollowed();
    //this.$lobbys = this.chatService.getUserLobbys(this.userLoggedData.uid);
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
  return this.followService.checkFollow(this.userId,this.userLoggedData.uid).subscribe(res=>{
    console.log(res);
    this.followed = res;
  });
}

openChat = (uid) => {

  let lobby = {
    uid: this.uuidv4(),
    id_emisor: this.userLoggedData.uid,
    id_receptor: uid
  }

  this.chatService.createLobby(lobby).subscribe(res => {
    console.log(res);
  });
}

uuidv4(): string {
  return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(
  /[018]/g,
  (c: number) =>
      (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
  );
}
}
