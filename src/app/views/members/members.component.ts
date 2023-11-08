import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { FollowService } from 'src/app/services/follow.service';
import { LockService } from 'src/app/services/lock.service';
import { OauthService } from 'src/app/services/oauth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit,OnDestroy{
  
  userLoggedObservable = this.lockService.checkToken();
  userLogged;
  sub
  members:Observable<any>;
  searchedData:[];
  
  p = 1;

  ROLES = {
    user: 'USUARIO',
    admin: 'ADMIN',
    docent: 'DOCENTE',
    student: 'ESTUDIANTE'
  }

  constructor(private lockService:LockService, private userService: UserService, private followService: FollowService){

  }

  ngOnInit(): void {
    this.members = this.userService.getFullDataUsers();


    this.sub = this.userLoggedObservable.subscribe(user=>{
      this.userLogged = user;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  showSearched = ($event) => {
    this.searchedData = $event;
  }
}
