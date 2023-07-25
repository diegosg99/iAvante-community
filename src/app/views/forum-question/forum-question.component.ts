import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { ForumService } from 'src/app/services/forum.service';
import { OauthService } from 'src/app/services/oauth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forum-question',
  templateUrl: './forum-question.component.html',
  styleUrls: ['./forum-question.component.scss']
})
export class ForumQuestionComponent implements OnInit{

  @Output() idQuestion:any = new EventEmitter<string>();
  @Output() commentsDiv:any = new EventEmitter<string>();
  question:any;
  userId:any;
  userQuestion;
  usersComments;
  userLogged = this.auth.getUserLogged();
  comments:any = [];
  clickedComment = false;

  constructor(private forumService: ForumService,private router:Router,private _activatedroute:ActivatedRoute, private auth: OauthService,private userService:UserService){}

  ngOnInit(): any {

    this.idQuestion = this._activatedroute.params;
    this.commentsDiv = document.getElementById('divComments');

    this.getQuestionData();
    this.getQuestionComments();
  }

  getQuestionData = () => {
    this.forumService.getQuestion(this.idQuestion.value.id).snapshotChanges().subscribe(question=>{
      this.question = {...question.payload.data()};
      this.userId = this.question.usuario;

      this.userService.getUser(this.userId).subscribe(user=>{
        this.userQuestion = {...user.payload._delegate._document.data.value.mapValue.fields};
      });
      
      let formatDate = this.formatDate(this.question.fechaCreacion);
      this.question.fechaCreacionFormat = formatDate;
    });
  }

  getQuestionComments = () => {
    this.forumService.getResponses(this.idQuestion.value.id).subscribe(comments=>{
    this.comments = [];

      comments.forEach(comment => {

        let arraySegments = comment.payload.doc._delegate._key.path.segments;
        let commentId = arraySegments[arraySegments.length - 1];

        let processedComment = {id:commentId,...comment.payload.doc.data()};
        processedComment.fechaCreacionFormat = this.formatDate(processedComment.fechaCreacion);
        this.comments.push(processedComment);
      });

      this.comments.sort((a,b)=>{return a.fechaCreacion-b.fechaCreacion});
    });
  };

  formatDate = (date) => {
    let fullDate = date.toDate();
      let day = fullDate.getDate();
      let month = fullDate.getMonth();
      let year = fullDate.getFullYear();
      let hour = fullDate.getHours();
      let minutes = fullDate.getMinutes()<=9?'0'+fullDate.getMinutes().toString():fullDate.getMinutes();

      return (day+'/'+(month+1)+'/'+year+' - '+hour+':'+minutes);
  }
}
