import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumService } from 'src/app/services/forum.service';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-forum-question',
  templateUrl: './forum-question.component.html',
  styleUrls: ['./forum-question.component.scss']
})
export class ForumQuestionComponent implements OnInit{

  idQuestion:any;
  question:any;
  questionRef:any;
  userId:any;
  userLogged = this.auth.getUserLogged();

  constructor(private forumService: ForumService,private router:Router,private _activatedroute:ActivatedRoute, private auth: OauthService){}

  ngOnInit(): void {

    this.idQuestion = this._activatedroute.params;

    this.forumService.getQuestion(this.idQuestion.value.id).snapshotChanges().subscribe(question=>{
      
      this.question = {...question[0].payload.doc.data()};
      this.userId = this.question.usuario;
      console.log(this.question);
      console.log(this.userId);
    })
  }
}
