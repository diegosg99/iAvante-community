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
    this.manageFollowedPosts();
  }

  getUserFollows = (userId) => {
    return this.followService.getUserFollows(userId);
  }

  manageFollowedPosts = () => {

    this.posts = [];

    this.userLogged.subscribe(user=>{
      this.userId = user.uid;
          this.getUserFollows(this.userId).subscribe(followeds => {
            
              this.followeds = followeds.map((follow:any)=>{
                return follow.payload.doc.data().userId;
              });

              this.followeds;

              this._postservice.getFollowedPosts(this.followeds).subscribe(posts=>{
                
                posts.forEach((post:any)=>{
                  this.posts = [...this.posts,{id:this.getIdPost(post),...post.payload.doc.data(),fechaActualizacionFormat: this.formatDate(post.payload.doc.data().fechaActualizacion)}];
                });

                this.posts.sort((a,b) => (a.fechaActualizacion < b.fechaActualizacion) ? 1 : ((b.fechaActualizacion < a.fechaActualizacion) ? -1 : 0))          
                console.log(this.posts);    
              });
          });
    });
  }

  formatDate = (date) => {
    let fullDate = date.toDate();
      let day = fullDate.getDate();
      let month = fullDate.getMonth();
      let year = fullDate.getFullYear();
      let hour = fullDate.getHours();
      let minutes = fullDate.getMinutes()<=9?'0'+fullDate.getMinutes().toString():fullDate.getMinutes();

      return (day+'/'+(month+1)+'/'+year+' - '+hour+':'+minutes);
  }

  getIdPost = (post) => {

        let arraySegments = post.payload.doc._delegate._key.path.segments;
        let postId = arraySegments[arraySegments.length - 1];

        return postId;
  }
}
