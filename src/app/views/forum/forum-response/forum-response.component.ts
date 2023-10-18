import { Component, Input, OnInit } from '@angular/core';
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
  numLikes;
  likes = [];
  commentedUserData;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log(this.comment);
    //console.log(this.comment);
    // this.userLogged.subscribe(user => {
    //   this.userUID = user.uid;
    // })
    // this.getCommentedUserData();
    // this.getLikes();
  }

  likeComment = () => {

    const COMMENT_LIKE:any = {
      usuario: null,
      question:this.comment.preguntaId,
      comment: this.comment.id
    };    

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
    this.getLikes();
  }

  getLikes = () => {
    // this.forumService.getLikesResponse(this.commentId).subscribe((likes:any)=> {

    //   this.likes = [];
    //   likes.forEach(like => {
    //     let arraySegments = like.payload.doc._delegate._key.path.segments;
    //     let likeId = arraySegments[arraySegments.length - 1];
  
    //     let processedLike = {id:likeId,...like.payload.doc.data()};
    //     this.likes.push(processedLike);
    //   })

    //   this.numLikes = this.likes.length;
    //   this.isLiked();
    // });
  }

  isLiked = () => {

    let myLike = this.likes.find((like) => {
      return (like.usuario === this.userLogged.uid)
    });
    this.clickedComment= myLike === null||myLike===undefined?false:true;
  }

  getCommentedUserData = () => {
    this.userService.getUser(this.comment.usuario).subscribe(user => {
      this.commentedUserData = {...user.payload._delegate._document.data.value.mapValue.fields};
      console.log(this.commentedUserData);
    });
  }
}
