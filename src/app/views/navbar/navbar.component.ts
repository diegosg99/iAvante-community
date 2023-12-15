import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, concat, concatMap } from 'rxjs';
import { LockService } from 'src/app/services/lock.service';
import { OauthService } from 'src/app/services/oauth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  userID;
  user;
  email;
  $userSubscription: Observable<any> = this.lockService.checkToken();

  constructor(private oauth: OauthService,private lockService: LockService) {
  }

  logout = () => {
    this.oauth.logout();
  }
}
