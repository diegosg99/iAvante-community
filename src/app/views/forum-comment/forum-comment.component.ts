import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ForumService } from 'src/app/services/forum.service';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-forum-comment',
  templateUrl: './forum-comment.component.html',
  styleUrls: ['./forum-comment.component.scss']
})
export class ForumCommentComponent implements OnInit{
  
  @Input() questionId;
  @Input() divComments;
  form: FormGroup;

  // userUID:any = this.auth.getUserLogged().subscribe();
  // userLogged = this.auth.getUserLogged();
  
  constructor(fb: FormBuilder,private forumService:ForumService,private auth:OauthService,private toastr:ToastrService){
    this.form = fb.group({
      response: ['',[Validators.required,Validators.minLength(16)]]
    });
    // this.auth.getUserLogged().subscribe(user=> {
    //   this.userUID = user.uid
    // })
  }

  ngOnInit(): void {
  }

  uploadResponse = () => {
    const RESPONSE: any = {
      respuesta: this.form.value.response,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      //usuario: this.userUID,
      preguntaId: this.questionId.value.id,
      likes: 0
    };

    this.forumService.uploadResponse(RESPONSE).then(()=> {
      
      this.toastr.success('Tu respuesta se ha publicado con éxito.','¡Genial!',{ progressBar: true,positionClass: 'toast-bottom-right'});
      //this.divComments.innerHTML += ''; 
      this.form.reset();

    },(error: any) => {
      this.toastr.error('Oops.. Ha habido un problema al responder la pregunta ¡Intentalo más tarde!','Error!',{ progressBar: true,positionClass: 'toast-bottom-right'});
    });
  }
}
