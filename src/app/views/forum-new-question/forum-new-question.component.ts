import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForumService } from 'src/app/services/forum.service';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-forum-new-question',
  templateUrl: './forum-new-question.component.html',
  styleUrls: ['./forum-new-question.component.scss']
})
export class ForumNewQuestionComponent implements OnInit{
  
  form: FormGroup;

  userUID:any = this.auth.getUserLogged().subscribe();
  
  constructor(fb: FormBuilder,private forumService:ForumService,private auth:OauthService){
    this.form = fb.group({
      title: ['',Validators.required],
      category: [''],
      description: ['',[Validators.required,Validators.minLength(16)]]
    });
    this.auth.getUserLogged().subscribe(user=> {
      this.userUID = user.uid
    })
  }

  ngOnInit(): void {
    
  }

  uploadNewForum = () => {
    const FORUM: any = {
      titulo: this.form.value.title,
      descripcion: this.form.value.description,
      categoria: this.form.value.category,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      usuario: this.userUID
    }

    this.forumService.uploadQuestion(FORUM).then(()=> {
      console.log(FORUM);
      this.form.reset();
    },(error: any) => {
      console.log(error);
    });
  }
}
