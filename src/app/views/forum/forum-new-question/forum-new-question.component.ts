import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Question } from 'src/app/models/Question';
import { ForumService } from 'src/app/services/forum.service';
import { LockService } from 'src/app/services/lock.service';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-forum-new-question',
  templateUrl: './forum-new-question.component.html',
  styleUrls: ['./forum-new-question.component.scss']
})
export class ForumNewQuestionComponent implements OnInit{
  
  form: FormGroup;
  userLogged;
  
  constructor(fb: FormBuilder,private forumService:ForumService,private auth:OauthService,private toastr:ToastrService,private lockService: LockService){
    this.form = fb.group({
      title: ['',Validators.required],
      category: [''],
      description: ['',[Validators.required,Validators.minLength(16)]]
    });
    
    this.lockService.checkToken().subscribe(res=>{
      this.userLogged = res;
      return res;
    });
  }

  ngOnInit(): void {
    
  }

  uploadNewForum = () => {
    const QUESTION:any = {
      uid: this.uuidv4(),
      title: this.form.value.title,
      body: this.form.value.description,
      usuario: this.userLogged.uid,
      category: this.form.value.category,
      views: 0,
      status: 0,
      created_at: new Date(),
      updated_at: new Date()
    };

    this.forumService.uploadQuestion(QUESTION).subscribe(data=> {
      
      if (data.code === 201) {
        this.toastr.success('La pregunta se ha publicado con éxito.','¡Genial!',{ progressBar: true,positionClass: 'toast-top-right'});
        this.form.reset();
      }
      else {
        this.toastr.error('Oops.. Ha habido un problema al subir la pregunta ¡Intentalo más tarde!','Error!',{ progressBar: true,positionClass: 'toast-bottom-right'});
      }
    },(error: any) => {
      this.toastr.error('Oops.. Ha habido un problema al subir la pregunta ¡Intentalo más tarde!','Error!',{ progressBar: true,positionClass: 'toast-bottom-right'});
    });
  }

  uuidv4(): string {
    return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(
    /[018]/g,
    (c: number) =>
        (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
  }
}
