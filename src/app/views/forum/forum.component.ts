import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit{

  questions:any;
  topQuestions:any;

  constructor(private forumService: ForumService,private router:Router){}

  ngOnInit(): void {
    this.forumService.getQuestions().subscribe(questions => {

      let processedQuestions: any[] = [];

      questions.forEach((question: any)=>{
        let arraySegments = question.payload.doc._delegate._key.path.segments;
        let questionId = arraySegments[arraySegments.length - 1];

        processedQuestions.push({id:questionId,...question.payload.doc.data()});
      })

      this.questions=processedQuestions;

//----------------------- TODO para traer los foros más top ---------------------------
      this.topQuestions = this.questions;
      this.topQuestions.sort((a, b) => a.views < b.views);
      this.topQuestions = this.topQuestions.slice(0,3);
//-------------------------------------------------------------------------------------
//----------------------- TODO ordenar por reciente ---------------------------

this.questions.sort((a, b) => a.fechaCreacion < b.fechaCreacion);

//-------------------------------------------------------------------------------------

    })
  }

  updateViews = (idQuestion) => {
    let question = this.questions.find(q=>q.id===idQuestion);

    this.forumService.updateQuestionViews(idQuestion,question).then(res=>
      {
        this.router.navigate(["foro/"+idQuestion]);
      });
  }
}
