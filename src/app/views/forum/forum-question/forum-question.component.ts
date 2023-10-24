import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
export class ForumQuestionComponent implements OnInit{

  idQuestion:any = this._activatedroute.snapshot.paramMap.get('id');
  //@Output() commentsDiv:any = new EventEmitter<string>();
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

  ngOnInit(): any {
  }

  // getQuestionComments = () => {

  //   console.log('Hola')

  //   this.forumService.getResponses(this.idQuestion.value.id).subscribe(comments=>{
  //     this.comments = comments;
  //     console.log(comments);
  //     this.comments.sort((a,b)=>{return a.fechaCreacion-b.fechaCreacion});
  //   });
  // };

  // formatDate = (date) => {
  //   let fullDate = date.toDate();

  //     let day = fullDate.getDate();
  //     let month = fullDate.getMonth();
  //     let year = fullDate.getFullYear();
  //     let hour = fullDate.getHours();
  //     let minutes = fullDate.getMinutes()<=9?'0'+fullDate.getMinutes().toString():fullDate.getMinutes();

  //     return (day+'/'+(month+1)+'/'+year+' - '+hour+':'+minutes);
  // }
}
