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

      const RESPONSE: any = {
        uid: this.uuidv4(),
        respuesta: this.form.value.response,
        usuario: this.userLogged.uid,
        preguntaId: this.questionId,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
      };
    
      this.forumService.uploadResponse(RESPONSE).subscribe(data=>{
        
        if (data.code === 201) {
          this.toastr.success('La respuesta se ha registrado con éxito.','¡Genial!');
          this.form.reset();
        }else{
          this.toastr.error('Oops.. Ha habido un problema al subir la respuesta ¡Intentalo más tarde!','Error!')
          this.form.reset();
        }
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
