import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';

@Component({
  selector: 'app-learn-with-us',
  templateUrl: './learn-with-us.component.html',
  styleUrls: ['./learn-with-us.component.scss']
})
export class LearnWithUsComponent implements OnInit{

  videos;

  constructor(private youtubeService: YoutubeService){

  }
   
  ngOnInit() {
    this.youtubeService.getVideosForChanel('UC_O_KkdH3SKsp3nHrjgJYWA',10).subscribe((data:any)=> {
      console.log(data);
      this.videos = data.items;
    });
  }
}
