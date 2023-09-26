import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReCaptchaEnterpriseProvider } from '@angular/fire/app-check';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { FollowService } from 'src/app/services/follow.service';
import { ForumService } from 'src/app/services/forum.service';
import { ImageService } from 'src/app/services/image.service.service';
import { LockService } from 'src/app/services/lock.service';
import { OauthService } from 'src/app/services/oauth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  userLogged:any;
  userId;
  user;

  ROLES = {
    user: 'USUARIO',
    admin: 'ADMIN',
    docent: 'DOCENTE'
  }

  constructor(
      private lockService: LockService,private userService:UserService,
      private _activatedroute:ActivatedRoute){
    
    
    this._activatedroute.params.subscribe(data=>
      {
        
        this.userId = data['id'];

          let sub = this.lockService.checkToken().subscribe(res=>{
            this.userLogged = res;
            this.userService.getUser(this.userId).subscribe(res => {
              this.user = res;
  
              console.log(this.user);
            });
          });
      });
  }

  ngOnInit(): void {
  }
}
