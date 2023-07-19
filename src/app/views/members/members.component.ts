import { Component, OnInit } from '@angular/core';
import { OauthService } from 'src/app/services/oauth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit{
  
  userLogged = this.auth.getUserLogged();
  
  members:any = [];

  constructor(private auth:OauthService, private userService: UserService){

  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(members=>{

      this.members = this.processUsers(members);
      console.log(this.members);
    })
  }

  processUsers = (users) => {
    let processedUsers: any[] = [];

    users.forEach((question: any)=>{
      let arraySegments = question.payload.doc._delegate._key.path.segments;
      let questionId = arraySegments[arraySegments.length - 1];

      processedUsers.push({id:questionId,...question.payload.doc.data()});
    })

    return processedUsers;
  }

}
