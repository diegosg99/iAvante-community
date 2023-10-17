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

  @Output() idQuestion:any = new EventEmitter<string>();
  @Output() commentsDiv:any = new EventEmitter<string>();
  question:any;
  userId:any;
  userQuestion;
  usersComments;
  userLogged = this.lockService.checkToken();
  comments:any = [];
  clickedComment = false;
  $questionSubscription: Observable<any>;

  constructor(private forumService: ForumService,private router:Router,private _activatedroute:ActivatedRoute, private lockService: LockService,private userService:UserService){}

  ngOnInit(): any {
    //this.idQuestion = this._activatedroute.params;

    this._activatedroute.params.subscribe(data=>
      {
        
        this.idQuestion = data['id'];
        
        this.$questionSubscription = this.forumService.getQuestion(this.idQuestion);
        this.commentsDiv = document.getElementById('divComments');     
      });
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
