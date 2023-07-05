import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from "@angular/common/http";
import { environment } from "../environments/environment";
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews = (category) => {
    return this.http.get(environment.news.mediastack[category]);
  }
}
