import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  $events: Observable<any> = this.eventsService.getAllEvents();
  @Input() $user:Observable<any>;

  constructor(private eventsService: EventsService) {}
}
