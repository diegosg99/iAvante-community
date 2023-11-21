import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';
import { LockService } from 'src/app/services/lock.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit{

  postId:any = this._activatedroute.snapshot.paramMap.get('id');
  $event:Observable<any> = this.eventService.getEvent(this.postId);
  $userLogged:Observable<any> = this.lockService.checkToken();
  $peopleSubscribed:Observable<any> = this.eventService.getPeopleSubscribed(this.postId);
  $subscribed:Observable<any>;

  subscribed;

  constructor(private eventService:EventsService,private _activatedroute:ActivatedRoute,private lockService:LockService){}

  ngOnInit(): void {
    this.$userLogged.subscribe(res=> {
      console.log(res);
      this.isSubbed(res.uid);
    });
  }

  subscribeToEvent = (userID) => {
    console.log(userID);
    this.eventService.subscribeToEvent(userID,this.postId).subscribe();
  }

  unsubscribeToEvent = (userID) => {
    this.eventService.unsubscribeToEvent(userID,this.postId).subscribe()
  }

  isSubbed = (uid) => {
    this.eventService.getIsSubbed(uid,this.postId).subscribe(res=>{
      console.log(res);
      this.subscribed = res;
    });
  }
}
