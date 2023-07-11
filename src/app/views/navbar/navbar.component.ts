import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  userLogged = this.auth.getUserLogged();

  constructor(private auth:OauthService, private router:Router) {
    //this.auth.getUserLogged().subscribe(console.log);
  }

  logout = () => {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
