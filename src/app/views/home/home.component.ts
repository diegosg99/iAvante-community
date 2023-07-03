import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  
  posts:any = [1,2,3,4,5,6];
  
  constructor(private _postservice: PostService,private router:Router){}

  ngOnInit(): void {
    this._postservice.getPosts().subscribe(posts=>{

      let processedPosts: any[] = [];

      posts.forEach((post: any)=>{
        let arraySegments = post.payload.doc._delegate._key.path.segments;
        let postId = arraySegments[arraySegments.length - 1];

        processedPosts = [...processedPosts,{id: postId,...post.payload.doc.data()}];
      })
      this.posts=processedPosts;
      console.log(this.posts);
    });
  }
}
