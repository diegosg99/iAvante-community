import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ForumService } from 'src/app/services/forum.service';
import { LockService } from 'src/app/services/lock.service';
import { StatusService } from 'src/app/services/status.service';

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

  @ViewChild('myDialog',{static:false})myDialog: ElementRef;


//--------------------------------------- SUBS -----------------------------------
  userLogged = this.lockService.checkToken();
  $commentsSub: Observable<any> = this.forumService.getResponses(this.idQuestion);
  $questionSubscription: Observable<any> = this.forumService.getQuestion(this.idQuestion);

  clickedComment = false;

  constructor(private forumService: ForumService,private router:Router,private _activatedroute:ActivatedRoute, private lockService: LockService,private statusService:StatusService){}

  changeStatus = (status) => {
    this.statusService.setStatus(status,this.idQuestion,'questions').subscribe(res=>{
      this.myDialog.nativeElement.close()
    });
  }
}
