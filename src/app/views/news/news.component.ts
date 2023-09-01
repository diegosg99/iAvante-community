import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit{

  news:any;
  category:any;
  p = 1;

  constructor(private newsService: NewsService,private router:Router,private _activatedRoute:ActivatedRoute){}

  ngOnInit(): void {

    let category:any = this._activatedRoute.params;
    this.category = category.value.category

    this.newsService.getNews(this.category).subscribe(news => {
      this.news = news;
    });
  }

}
