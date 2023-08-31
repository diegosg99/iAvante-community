import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FollowService } from 'src/app/services/follow.service';
import { OauthService } from 'src/app/services/oauth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  
  userLogged = this.auth.getUserLogged();
  userId;
  posts:any = [];
  followeds;
  p = 1;
  
  constructor(private _postservice: PostService,private router:Router, private followService: FollowService, private auth: OauthService){}

  ngOnInit(): void {

    //this.oldBringPosts();

    this.userLogged.subscribe(user=>{
      this.userId = user.uid;
          this.getUserFollows(this.userId).subscribe(followeds => {
            
              this.followeds = followeds.map((follow:any)=>{
                return follow.payload.doc.data().userId;
              });

              this._postservice.getFollowedPosts(this.followeds).subscribe(posts=>{
                
                console.log(posts);

                posts.forEach(post=>{
                  this.posts = [...this.posts,post.payload.doc.data()];
                })
              });
          });
    });
  }

  getUserFollows = (userId) => {
    return this.followService.getUserFollows(userId);
  }


  oldBringPosts = () => {
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
