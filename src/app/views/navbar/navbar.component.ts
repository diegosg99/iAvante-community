import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LockService } from 'src/app/services/lock.service';
import { OauthService } from 'src/app/services/oauth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  userLogged = this.auth.getUserLogged();
  userID;
  user;

  constructor(private auth:OauthService, private router:Router,private userService: UserService,private oauth: OauthService,private lockService: LockService) {
    this.auth.getUserLogged().subscribe(console.log);
  }

  ngOnInit(): void {
    //this.getUserData();
  }

  getUserData = () => {
    console.log('Checkeando')

    this.lockService.checkToken().subscribe(
      result => {
        console.log(result)
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/login');
      },
      () => {
      })
  }

  logout = () => {
    this.oauth.logout();
  }
}
