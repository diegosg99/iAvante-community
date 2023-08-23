import { Component, OnInit } from '@angular/core';
import { FollowService } from 'src/app/services/follow.service';
import { OauthService } from 'src/app/services/oauth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit{
  
  userLogged = this.auth.getUserLogged();
  userId;
  members:any = [];

  ROLES = {
    user: 'USUARIO',
    admin: 'ADMIN',
    docent: 'DOCENTE'
  }

  constructor(private auth:OauthService, private userService: UserService, private followService: FollowService){

  }

  ngOnInit(): void {
    this.userLogged.subscribe(user=>{
      this.userId = user.uid;
    });

    this.userService.getUsers().subscribe(members=>{
      this.members = this.processUsers(members);
    })   
  }

  processUsers = (users) => {
    let processedUsers: any[] = [];

    users.forEach((question: any)=>{
      let arraySegments = question.payload.doc._delegate._key.path.segments;
      let questionId = arraySegments[arraySegments.length - 1];

      let processedUser = {...question.payload.doc.data()}
      processedUser.role = this.ROLES[processedUser.role];

      processedUsers.push({id:questionId,...processedUser});
    })

    return processedUsers;
  }
}
