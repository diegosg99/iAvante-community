import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  clickedComment:boolean;
  // userUID;
  numLikes:Observable<any>;
  likes = [];
  commentedUserData;
  $likesSub: Observable<any>;

  constructor(private userService: UserService,private forumService:ForumService) {}

  ngOnInit(): void {
    this.numLikes = this.forumService.getLikesResponse(this.comment.uid);
    //this.getLikes();
  }

  likeComment = () => {
    this.userLogged.subscribe(user=>{
      console.log(user);
      this.forumService.likeResponse(user.uid,this.comment.uid).subscribe(data=>{
        console.log(data);
        this.getLikes();
      });
    })

    // if (this.userLogged!= null && this.clickedComment) {
  
    //   this.clickedComment = false;

    //   let deletedLike = this.likes.find((like) => {
    //     return (like.usuario === this.userUID && like.comment === this.commentId)
    //   })

    //   this.forumService.removeLikeResponse(deletedLike.id);

    // }else{
    //   this.clickedComment = true;
    //   this.forumService.likeResponse(COMMENT_LIKE);
    // }

  }

  getLikes = () => {
    this.forumService.getLikesResponse(this.comment.uid).subscribe((likes:any)=> {
      this.likes = likes;
      console.log(likes);
      this.numLikes = likes.length;
      this.isLiked();
    });
  }

  isLiked = () => {

    let myLike = this.likes.find((like) => {
      return (like.usuario === this.userLogged.uid)
    });
    this.clickedComment= myLike === null||myLike===undefined?false:true;
  }

  getCommentedUserData = () => {
  }
}
