import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, debounceTime } from 'rxjs';
import { ForumService } from 'src/app/services/forum.service';
import { LockService } from 'src/app/services/lock.service';
import { OauthService } from 'src/app/services/oauth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forum-question',
  templateUrl: './forum-question.component.html',
  styleUrls: ['./forum-question.component.scss']
})
export class ForumQuestionComponent {

  idQuestion:any = this._activatedroute.snapshot.paramMap.get('id');
  $questions:Observable<any> = this.forumService.getQuestions();
  question:any;
  userId:any;
  userQuestion;
  usersComments;
  type='question';

//--------------------------------------- SUBS -----------------------------------
  userLogged = this.lockService.checkToken();
  $commentsSub: Observable<any> = this.forumService.getResponses(this.idQuestion);
  $questionSubscription: Observable<any> = this.forumService.getQuestion(this.idQuestion);

  clickedComment = false;

  constructor(private forumService: ForumService,private router:Router,private _activatedroute:ActivatedRoute, private lockService: LockService,private userService:UserService){}
}
