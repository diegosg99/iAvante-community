import { Component, Input, OnInit } from '@angular/core';
import { of,Observable } from 'rxjs';
import { ForumService } from 'src/app/services/forum.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forum-response',
  templateUrl: './forum-response.component.html',
  styleUrls: ['./forum-response.component.scss']
})
export class ForumResponseComponent implements OnInit{

  @Input() comment:any;
  @Input() userLogged:any;
  clickedComment:any;
  numLikes:Observable<any>;
  likes = [];
  commentedUserData;
  $likesSub: Observable<any>;

  constructor(private forumService:ForumService) {}

  ngOnInit(): void {
    this.getLikes();
  }

  likeComment = () => {

    if (this.clickedComment) {
      this.forumService.removeLikeResponse(this.userLogged.uid,this.comment.uid).subscribe(res => {
        this.getLikes();
      });
    }
    
    else{
      this.forumService.likeResponse(this.userLogged.uid,this.comment.uid).subscribe(data=>{
        this.getLikes();
      });
    }
  }

  getLikes = () => {
    this.forumService.getLikesResponse(this.comment.uid).subscribe((likes:any)=> {
      this.likes = likes;
      this.numLikes = likes.length;
      this.isLiked();
    });
  }

  isLiked = () => {

    this.clickedComment = this.likes.find((like) => {
      return (like.user === this.userLogged.uid)
    });
    // this.clickedComment = myLike === null||myLike===undefined?of(false):of(true);
    // console.log(myLike === null||myLike===undefined?false:true);
    // return myLike === null||myLike===undefined?false:true;
  }
}
