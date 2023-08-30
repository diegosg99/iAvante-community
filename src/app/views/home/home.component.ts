import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  
  posts:any = [];
  p = 1;
  
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
    });
  }

}
