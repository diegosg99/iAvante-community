import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private auth:OauthService, private router:Router,private userService: UserService) {
    this.auth.getUserLogged().subscribe(console.log);
  }

  ngOnInit(): void {
    this.userLogged.subscribe(user=> {
      this.userID = user.uid;

      this.userService.getUser(this.userID).subscribe(user => {
        this.user = {...user.payload._delegate._document.data.value.mapValue.fields};
      });
    });
  }

  logout = () => {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
