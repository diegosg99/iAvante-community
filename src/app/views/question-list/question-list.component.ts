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
  @Input() user;
  questionUser;

  constructor(private userService: UserService,private forumService:ForumService,private router:Router){}

  ngOnInit(): void {
    this.userService.getUser(this.question.usuario).subscribe(user=>{
      this.questionUser = {...user.payload._delegate._document.data.value.mapValue.fields};
      console.log(this.questionUser)
    })
  }

  updateViews = (idQuestion) => {

    this.forumService.updateQuestionViews(idQuestion,this.question).then(res=>
      {
        this.router.navigate(["foro/"+idQuestion]);
      });
  }

  removeQuestion = (idQuestion) => {
    this.forumService.removeQuestion(idQuestion);
  }
}
