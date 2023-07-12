import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit{

  questions:any;
  topQuestions:any;

  constructor(private forumService: ForumService){}

  ngOnInit(): void {
    this.forumService.getQuestions().subscribe(questions => {

      let processedQuestions: any[] = [];

      questions.forEach((question: any)=>{
        let arraySegments = question.payload.doc._delegate._key.path.segments;
        let questionId = arraySegments[arraySegments.length - 1];

        processedQuestions = [...processedQuestions,{id:questionId,...question.payload.doc.data()}];
      })
      this.questions=processedQuestions;


//----------------------- TODO para traer los foros más top ---------------------------
    //   this.topQuestions = this.questions.reduce(function(prev, current) {
    //     console.log(prev);
    //     console.log(current);
        
    //     return (prev.views > current.views) ? prev : current;
    // })
//-------------------------------------------------------------------------------------
      console.log(this.questions);
      console.log(this.topQuestions);
    })
  }

  updateViews = (idQuestion) => {
    let question = this.questions.find(q=>q.id===idQuestion);
    this.forumService.updateQuestionViews(idQuestion,question).then(res=>console.log(res));
  }
}
