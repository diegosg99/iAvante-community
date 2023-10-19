import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForumService } from 'src/app/services/forum.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit{

  @Input() question;
  questionUser;

  constructor(private userService: UserService,private forumService:ForumService,private router:Router){}

  ngOnInit(): void {
  }

  updateViews = (question) => {    
    this.forumService.updateQuestionViews(question).subscribe(res=>
      {
        this.router.navigate(["foro/"+question.uid]);
      });
  }

  removeQuestion = (idQuestion) => {
    this.forumService.removeQuestion(idQuestion);
  }
}
