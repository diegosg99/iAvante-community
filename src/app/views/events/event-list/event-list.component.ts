import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import flatpickr from 'flatpickr';
import { Observable } from 'rxjs';
import { DateService } from 'src/app/services/date.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {

// ----------------------------------------------------------------------------- PREVIOUS CODE --------------------------------------------------------------------------

  // $eventSubscription: Observable<any> = this.eventService.getAllEvents();

  // eventDates = {};
  // today = new Date();
  // months = {
  //   0: 'Enero',
  //   1: 'Febrero',
  //   2: 'Marzo',
  //   3: 'Abril',
  //   4: 'Mayo',
  //   5: 'Junio',
  //   6: 'Julio',
  //   7: 'Agosto',
  //   8: 'Septiembre',
  //   9: 'Octubre',
  //   10: 'Noviembre',
  //   11: 'Diciembre',
  // }

  // // @ViewChild('calendar',{static:false})calendar: ElementRef;
  // @ViewChild('calendar-days',{static:false})calendarDays: ElementRef;

  // constructor(private eventService: EventsService) {
  //   this.fillCalendar()
  // }

  // fillCalendar = () => {

  //   this.$eventSubscription.subscribe(events=>{
  //     events.forEach(event => {
  //       console.log(event);
  //     });
  //   })

  //   console.log(this.getDayName(this.today,'es-SP'));
  //   console.log(this.months[this.today.getMonth()]);  
  // }

  // getDayName = (dateStr, locale) => {
  //   //let date = new Date(dateStr); si lo que pasas es formato string '04/11/2022'
  //   return dateStr.toLocaleDateString(locale, { weekday: 'long' });        
  // }

// ----------------------------------------------------------------------------- PREVIOUS CODE --------------------------------------------------------------------------

   //-----Dia de hoy-----

   viewDate: Date = new Date();

   //-----Formularios-----
 
   eventForm: FormGroup;
   eventFormCreate: FormGroup;
   bringEvents: FormGroup;
 
   //-----Eventos-----
 
   event: any;
   events: any = []
 
   month:any = this.viewDate.getMonth;

  tableCells = Array(7).fill(0);
 
  week = ['L','M','X','J','V','S','D'];
   months: any = [
     {name:'Enero',days:this.range(31),code:0},
     {name:'Febrero',days:this.range(28),code:1},
     {name:'Marzo',days:this.range(31),code:2},
     {name:'Abril',days:this.range(30),code:3},
     {name:'Mayo',days:this.range(31),code:4},
     {name:'Junio',days:this.range(30),code:5},
     {name:'Julio',days:this.range(31),code:6},
     {name:'Agosto',days:this.range(30),code:7},
     {name:'Septiembre',days:this.range(31),code:8},
     {name:'Octubre',days:this.range(30),code:9},
     {name:'Noviembre',days:this.range(31),code:10},
     {name:'Diciembre',days:this.range(30),code:11}
   ]
 
   provinces: any = [
     {name: "Granada",code:0},
     {name: "Málaga",code:1},
     {name: "Sevilla",code:2},
     {name: "Jaén",code:3},
     {name: "Almería",code:4},
     {name: "Huelva",code:5},
     {name: "Cordoba",code:6},
     {name: "Cádiz",code:7},
     {name: "Rutas",code:8}
   ]
 
   constructor(
     private eventService: EventsService,
     public dateService: DateService,
     ) {
 
     this.bringEvents = new FormGroup({
       month: new FormControl(),
       province: new FormControl(),
     });
   }
 
   ngOnInit() {
     this.getEvents(this.viewDate.getMonth());
   }
 
   range (start: number){
     return Array.from({length: start}, (_, index) => index + 1);
   } 
 
   getEvents(month: any) {
     this.month = month;
     this.eventService.getAllEvents().subscribe(events => {
 
       this.events = events;
       this.printEvents();
 
     });
   }
 
   showForm(form: string) {
 
     const forms: any = {
       'bring': {status:0,id:'content1'},
       'event': {status:0,id:'content2'}
     }
     forms[form].status===0?forms[form].status=1:forms[form].status=0;
 
     if (forms[form].status === 1)
     {
       let item = document.getElementById(forms[form].id);
       item?.classList.remove('none');
       item?.classList.add('block');
       
     }else{
       let item = document.getElementById(forms[form].id);
       item?.classList.remove('block')
       item?.classList.add('none')
     }
 
     let formsNames = Object.keys(forms);
 
     let antiform: any = formsNames.find(name => name!==form);
 
     document.getElementById(forms[antiform].id)?.classList.remove('block');
     document.getElementById(forms[antiform].id)?.classList.add('none');
   }
 
   cleanCalendar = () => {
 
     let ids: any[] = [];
     let monthNumber = this.viewDate.getMonth();
     let month = this.months.find((month: { code: any; }) =>
       {
         if (month.code === (monthNumber-1)) {
           return month;
         }
         return 0;
       }
       );
 
     month.days.forEach((day: any) => {
       this.provinces.forEach((province:any) => {
         ids = [...ids,province.name+'-'+day];
       })
     });
     ids.forEach(id => {
       let td = document.getElementById(id);
       if (td !== null) {
         td.innerHTML="";
       }
     });
   }
 
   printEvents = () => {
     this.cleanCalendar();
 
     this.events.forEach((e: { province: string;start_date:string;name:string;code: string;room:any;schedule:any;color:any; }) => {
 
       e.code = (e.code===null ||e.code === "")?'Sin código':e.code;
       let day = e.start_date.trim().substring(0,2);
       let province = e.province.trim() //Habrá que quitarlo si quieres añadir la provincia Virtual
 
       let id:string = province+'-'+parseInt(day,10);
       let td = document.getElementById(id);
 
       if (td !== null) {
         td.innerHTML+=`
         <div style='font-size:10px;border-bottom: 1px solid #dee2e6;background-color:${e.color};
         padding-bottom: 1em;margin-bottom: 1em;'>
           <p class='eventSelector' style='color:#2274A5;'>${e.code}</p>${e.name}<p style='margin-bottom: 0px;'>
             Aulas: ${e.room}
           </p><p style='margin-bottom: 0px;'>
             Horario: ${e.schedule}
           </p>
         </div>`;
       }
     });
 
     this.bindEvents();
   }
 
   bindEvents = () => {
     let classEvents = document.getElementsByClassName('eventSelector');
 
     let classKeys = Object.keys(classEvents);
     classKeys.forEach((key:any)=>{
 
       classEvents[key].addEventListener("click",()=> {
 
        //  this.eventService.getEventByCode(classEvents[key].innerHTML).subscribe(evento => {
        //    this.event = evento[0];
     
        //    this.event.start_date = this.event.start_date.trim();
     
        //    let month = parseInt(this.event.start_date.substring(3,5))-1;
 
        //        let province = this.provinces.find((prov: {
        //          name: string; code: number; 
        //        }) => {
        //        return prov.name === this.event.province.trim()? prov:null;
        //      })
     
        //      this.eventForm.setValue({
        //        'id': this.event.id,
        //        'code': this.event.code.trim(),
        //        'name': this.event.name.trim(),
        //        'color': this.event.color?this.event.color:'white',
        //        'rooms': this.event.room?this.event.room:null,
        //        'workshops': this.event.workshops?this.event.workshops:null,
        //        'location': this.event.location.trim()?this.event.location:null,
        //        'hours': this.event.schedule?this.event.schedule.trim():"",
        //        'breakfast': this.event.breakfast?this.event.breakfast.trim():"",
        //        'snack': this.event.snack?this.event.snack.trim():"",
        //        'lunch': this.event.lunch?this.event.lunch.trim():"",
        //        'details': this.event.details?this.event.details.trim():""
        //      });
        //      this.showDialog();
        //  });
       });
     })
   }
}
