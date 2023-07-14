import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OauthService } from 'src/app/services/oauth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  userLogged = this.auth.getUserLogged();
  userForm: FormGroup;

  formEdit = {
    realName:false,
    username:false,
    job:false,
    desc:false
  }

  constructor(private auth:OauthService,private userService:UserService,private router:Router,private _activatedroute:ActivatedRoute){
    this.userForm = new FormGroup({
      photo: new FormControl(),
      realName: new FormControl(),
      userName: new FormControl(),
      userJob: new FormControl(),
      userDesc: new FormControl()

  });
  }

  ngOnInit(): void {
    
  }
}
