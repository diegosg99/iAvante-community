import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';
import { ImageService } from 'src/app/services/image.service.service';
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
  $subscribed;

  subscribed;

  constructor(private eventService:EventsService,private _activatedroute:ActivatedRoute,private lockService:LockService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.refresh();
  }

// --------------------------------------------- ASISTENCIAS ------------------------------------

  refresh = () => {
    this.$userLogged.subscribe(res=> {
      this.$subscribed = this.isSubbed(res.uid);
    });

    this.$peopleSubscribed = this.eventService.getPeopleSubscribed(this.postId);
  }

  subscribeToEvent = (userID) => {
    this.eventService.subscribeToEvent(userID,this.postId).subscribe();
    this.toastr.success('Te has inscrito al evento','¡Genial!');
    this.refresh();
  }

  unsubscribeToEvent = (userID) => {
    this.eventService.unsubscribeToEvent(userID,this.postId).subscribe();
    this.toastr.warning('Ya no asistiras al evento','Vaya...')
    this.refresh();
  }

  isSubbed = (uid) => {
    return this.eventService.getIsSubbed(uid,this.postId).subscribe(res=>{
      this.subscribed = res;
    });
  }

}
