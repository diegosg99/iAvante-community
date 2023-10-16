import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FollowService } from 'src/app/services/follow.service';
import { LockService } from 'src/app/services/lock.service';
import { OauthService } from 'src/app/services/oauth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  
  userLogged = this.lockService.checkToken();
  userId;
  posts:any = [];
  followeds;
  followedPosts:any = [];
  

  p = 1;
  dir = 'news';
  
  constructor(private _postservice: PostService,private lockService:LockService, private followService: FollowService, private auth: OauthService){}

  ngOnInit(): void {
    this.manageFollowedPosts();
  }

  manageFollowedPosts = () => {

    this.posts = [];

    this.userLogged.subscribe(user=>{


      this.userId = user.uid;

      this.followService.getUserFollows(this.userId).subscribe(followeds => {

        this.followeds = followeds.data;

              // if (followeds.code === 201 ) {

              //   this.getLatestPosts(this.followeds);

              //   this._postservice.getFollowedPosts(this.followeds).subscribe(posts=>{
                
              //     // posts.forEach((post:any)=>{
              //     //   this.posts = [...this.posts,{id:this.getIdPost(post),...post.payload.doc.data(),fechaActualizacionFormat: this.formatDate(post.payload.doc.data().fechaActualizacion)}];
              //     // });
  
              //     this.posts.sort((a,b) => (a.fechaActualizacion < b.fechaActualizacion) ? 1 : ((b.fechaActualizacion < a.fechaActualizacion) ? -1 : 0))          
              //     console.log(this.posts);    
              //   });
              // }
          });
      
      this._postservice.getFollowedsPosts(this.userId).subscribe(posts => {
        console.log(posts);
        this.followedPosts = posts;
      });
    });
  }


getLatestPosts = (followeds) => {


  // let promises  = [];
  // let index = 0;

  //       let image = this.imageService.processImage(file,this.postId+'.'+this.uuidv4(), 'post.');
        
  //       console.log(image);

  //       //this.imgArray.push(image.get('file'));
  //       this.fdImg.append('files',image.get('file'));
  //       promises.push(this.imageService.getBase64(file));
  //   });

  //   this.imgArray.forEach(file=> {
  //     this.fdImg.append(`file${index}`,file);

  //     index++;
  //   })
    
  //   await Promise.all(promises).then((base64Arr) => {
  //     this.printImages(base64Arr);
  //   })

}

  // formatDate = (date) => {
  //   let fullDate = date.toDate();
  //     let day = fullDate.getDate();
  //     let month = fullDate.getMonth();
  //     let year = fullDate.getFullYear();
  //     let hour = fullDate.getHours();
  //     let minutes = fullDate.getMinutes()<=9?'0'+fullDate.getMinutes().toString():fullDate.getMinutes();

  //     return (day+'/'+(month+1)+'/'+year+' - '+hour+':'+minutes);
  // }

  load = (dir) => {
    this.dir = dir;
}
}
