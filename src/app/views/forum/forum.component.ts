import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ForumService } from 'src/app/services/forum.service';
import { LockService } from 'src/app/services/lock.service';
import { OauthService } from 'src/app/services/oauth.service';
import { UserService } from 'src/app/services/user.service';
import { SortPipe } from 'src/app/pipes/sort.pipe';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent {

  p = 1;

  questions;
  topQuestions;
  searchedData:any;

  cat = 'questions';

  ROLES = {
    user: 'USUARIO',
    admin: 'ADMIN',
    docent: 'DOCENTE'
  }

  STATUS = [
    'Cerrado',
    'Abierto',
    'Resuelto'
  ]

  userID;
  user;
  $questionSubscription: Observable<any> = this.forumService.getQuestions();
  $userSubscription: Observable<any> = this.lockService.checkToken();

  constructor(private forumService: ForumService,private auth: OauthService,private lockService: LockService){}
    
  getAllQuestions = () => {
    this.$questionSubscription = this.forumService.getQuestions();
  }

  getCategoryQuestions = (category) => {
    this.$questionSubscription = this.forumService.getCategoryQuestions(category)
  }

  getQuestionComments = (idQuestion) => {
    this.forumService.getResponses(idQuestion).subscribe(comments=>{

      let selectedQuestion = this.questions.find(q => {
        return q.id ===idQuestion;
      })
      selectedQuestion.comments = comments.length;
    })
  }

  removeQuestion = (idQuestion) => {
    this.forumService.removeQuestion(idQuestion);
  }

  showSearched = ($event) => {
    this.searchedData = $event;
  }
}
