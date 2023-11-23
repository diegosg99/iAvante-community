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
  event;
  
  $userLogged:Observable<any> = this.lockService.checkToken();
  $peopleSubscribed:Observable<any> = this.eventService.getPeopleSubscribed(this.postId);
  $subscribed;

  index:any = 0;
  slideIndex:any = 1;
  slides:any;
  dots:any;

  subscribed;

  $mediaSub: Observable<any>;
  $mediaSub2: Observable<any>;
  $mediaSub3: Observable<any>;

  constructor(private eventService:EventsService,private _activatedroute:ActivatedRoute,private lockService:LockService, private toastr: ToastrService,private imageService: ImageService){}

  ngOnInit(): void {

    this.$event.subscribe(res=>{
      this.event = res;
      this.getEventMedia();
    })

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

  getEventMedia = () => {
    let mediaArr = [this.event.media1,this.event.media2,this.event.media3].filter(media=>media!==null);

    mediaArr[0]?
      this.$mediaSub = this.imageService.getMediaPost(mediaArr[0]):null
    mediaArr[1]?
      this.$mediaSub2 = this.imageService.getMediaPost(mediaArr[1]):null;
    mediaArr[2]?
      this.$mediaSub3 = this.imageService.getMediaPost(mediaArr[2]):null
  }

  slidePhoto = (move) => {

    let photos = document.getElementsByClassName('event-image-'+this.event.uid);

    photos[this.index].classList.add('hide');
    photos[this.index].classList.remove('show');

    move==='back'?this.index--:this.index++;

    this.index<0?this.index=0:this.index;
    this.index>photos.length-1?this.index=photos.length-1:this.index;

    photos[this.index].classList.add('show');
    photos[this.index].classList.remove('hide');  

    console.log(photos);
  }}
