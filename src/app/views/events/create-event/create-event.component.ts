import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';
import { LockService } from 'src/app/services/lock.service';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {

  form: FormGroup;
  userLogged:any;

  constructor(fb: FormBuilder,private eventService:EventsService,private toastr:ToastrService,private lockService: LockService){
    this.form = fb.group({
      title: ['',Validators.required],
      description: ['',Validators.required,Validators.minLength(16)],
      date: ['',[Validators.required]],
      maxPeople: ['',[Validators.required]],
      province: ['',[Validators.required]],
      street: ['',[Validators.required]],
      start: ['',[Validators.required]],
      end: ['',[Validators.required]]
    });

    this.lockService.checkToken().subscribe(res=>{
      this.userLogged = res;
    });
  }

  uploadNewEvent = () => {
    const EVENT:any = {
      uid: this.uuidv4(),
      title: this.form.value.title,
      description: this.form.value.description,
      date: this.form.value.date,
      maxPeople: this.form.value.maxPeople,
      province: this.form.value.province,
      street: this.form.value.street,
      start: this.form.value.start,
      end: this.form.value.end,

    };

    this.eventService.uploadEvent(EVENT).subscribe((data:any)=> {
      
      if (data.code === 201) {
        this.toastr.success('El evento se ha publicado con éxito.','¡Genial!',{ progressBar: true,positionClass: 'toast-top-right'});
        this.form.reset();
      }
      else {
        this.toastr.error('Oops.. Ha habido un problema al crear el evento ¡Intentalo más tarde!','Error!',{ progressBar: true,positionClass: 'toast-bottom-right'});
      }
    },(error: any) => {
      this.toastr.error('Oops.. Ha habido un problema al crear el evento ¡Intentalo más tarde!','Error!',{ progressBar: true,positionClass: 'toast-bottom-right'});
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
