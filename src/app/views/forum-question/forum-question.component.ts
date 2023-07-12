import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { ForumService } from 'src/app/services/forum.service';
import { OauthService } from 'src/app/services/oauth.service';

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
  userLogged = this.auth.getUserLogged();
  comments:any = [];

  constructor(private forumService: ForumService,private router:Router,private _activatedroute:ActivatedRoute, private auth: OauthService){}

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
    });
  }

  getQuestionComments = () => {
    this.forumService.getResponses(this.idQuestion.value.id).subscribe(comments=>{
      console.log(comments);
      comments.forEach(comment => {
        this.comments = [...this.comments,comment.payload.doc.data()];
      });
      this.comments.sort((a,b)=>{a.fechaCreacion<b.fechaCreacion});
    });
  };
}
