import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{

  post:any;
  postId:any;

  constructor(private _postService: PostService,private router:Router,private _activatedroute:ActivatedRoute){

  }

  ngOnInit(): void {
    this.postId =  this._activatedroute.params;

    this._postService.getPost(this.postId.value.id);
    
    // subscribe(posts=>{

    //   let processedPost: any[] = [];

    //   posts.forEach((post: any)=>{
    //     let arraySegments = post.payload.doc._delegate._key.path.segments;
    //     let postId = arraySegments[arraySegments.length - 1];

    //     processedPost = [...processedPost,{id: postId,...post.payload.doc.data()}];
    //   })
    //   this.post=processedPost;
    //   console.log(this.post);
    // });
  }

}
