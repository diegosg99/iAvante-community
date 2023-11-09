import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'app-top-questions',
  templateUrl: './top-questions.component.html',
  styleUrls: ['./top-questions.component.scss']
})
export class TopQuestionsComponent implements OnInit{

  @Input() questions;
  topQuestions = [];

  constructor(private forumService: ForumService,private router:Router){}

  ngOnInit(): void {
    console.log(this.topQuestions);
    this.sortQuestions();
  }

  sortQuestions = () => {
    this.topQuestions = this.questions.sort((a,b)=>{
      (a.views > b.views) ? 1 : -1
    })
    this.topQuestions.slice(0,4);
  }

  updateViews = (question) => {    
    this.forumService.updateQuestionViews(question).subscribe(res=>
      {
        this.router.navigate(["foro/"+question.uid]);
      });
  }
}
