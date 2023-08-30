import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-fullPost',
  templateUrl: './full-post.component.html',
  styleUrls: ['./full-post.component.scss']
})
export class FullPostComponent implements OnInit{

  post:any;
  postId:any;
  @Input() postUser;

  constructor(private _postService: PostService,private router:Router,private _activatedroute:ActivatedRoute){

  }

  ngOnInit(): void {
    this.postId = this._activatedroute.params;

    this._postService.getPosts().subscribe(posts=>{

      let processedPosts: any[] = [];

      posts.forEach((post: any)=>{
        let arraySegments = post.payload.doc._delegate._key.path.segments;
        let postId = arraySegments[arraySegments.length - 1];

        processedPosts = [...processedPosts,{id: postId,...post.payload.doc.data()}];
      })

      this.post = processedPosts.find(post => post.id === this.postId.value.id);
    });
  }
}