import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concat, concatMap } from 'rxjs';
import { LockService } from 'src/app/services/lock.service';
import { OauthService } from 'src/app/services/oauth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  userLogged: any = null;
  userID;
  user;
  email;

  constructor(private cdr: ChangeDetectorRef, private router:Router,private userService: UserService,private oauth: OauthService,private lockService: LockService) {
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData = () => {
    this.lockService.checkToken()
    .subscribe({
      next: (result) => {

        const base64String = btoa(String.fromCharCode.apply(null, result.photo.data));

        result.photo = base64String;
        this.userLogged = result;

        console.log(base64String);
      },
      error: (error) => {
        console.log(error);
        this.router.navigate(['../login']);
      }
    })
  }

  logout = () => {
    this.oauth.logout();
    this.userLogged = "";
  }
}
