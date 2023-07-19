import { Component } from '@angular/core';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent {
  
  userLogged = this.auth.getUserLogged();
  
  constructor(private auth:OauthService){

  }

}
