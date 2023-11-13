import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent{

  postId:any = this._activatedroute.snapshot.paramMap.get('id');
  $event:Observable<any> = this.eventService.getEvent(this.postId);

  constructor(private eventService:EventsService,private _activatedroute:ActivatedRoute){}
}
