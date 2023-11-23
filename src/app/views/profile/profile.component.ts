import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LockService } from 'src/app/services/lock.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  userId = this._activatedroute.snapshot.paramMap.get('id');

  userLogged:Observable<any> = this.lockService.checkToken();
  user:Observable<any> = this.userService.getUser(this.userId);  

  ROLES = {
    user: 'USUARIO',
    admin: 'ADMIN',
    docent: 'DOCENTE'
  }

  constructor(private lockService: LockService,private userService:UserService,private _activatedroute:ActivatedRoute,private router:Router){}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
}
