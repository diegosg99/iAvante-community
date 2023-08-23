import { Component, Input, OnInit } from '@angular/core';
import { FollowService } from 'src/app/services/follow.service';
import { OauthService } from 'src/app/services/oauth.service';

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

  constructor(private auth:OauthService, private followService:FollowService){}

  ngOnInit(): void {
    this.userLogged.subscribe(user=>{
      this.userId = user.uid;
    }); 


  }

  followUser = (userId) => {
    console.log(userId);
    this.followService.followUser(userId,this.userId);


  }
  checkFollowed = () => {
    this.followService.checkFollow(this.userId);
  }
}
