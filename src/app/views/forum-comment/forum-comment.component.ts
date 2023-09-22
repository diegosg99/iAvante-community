import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ForumService } from 'src/app/services/forum.service';
import { LockService } from 'src/app/services/lock.service';

@Component({
  selector: 'app-forum-comment',
  templateUrl: './forum-comment.component.html',
  styleUrls: ['./forum-comment.component.scss']
})
export class ForumCommentComponent implements OnInit{
  
  @Input() questionId;
  @Input() divComments;
  @Input() userLogged;
  form: FormGroup;

  $userSubscription:Observable<any>;
  
  constructor(fb: FormBuilder,private forumService:ForumService,private lockService:LockService,private toastr:ToastrService){
    this.form = fb.group({
      response: ['',[Validators.required,Validators.minLength(16)]]
    });
  }

  ngOnInit(): void {
  }

  uploadResponse = () => {

    console.log(this.userLogged);

      const RESPONSE: any = {
        respuesta: this.form.value.response,
        usuario: this.userLogged.uid,
        preguntaId: this.questionId.value.id,
        likes: 0,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
      };
  
      console.log(RESPONSE);
  
      this.forumService.uploadResponse(RESPONSE);
  }
}
