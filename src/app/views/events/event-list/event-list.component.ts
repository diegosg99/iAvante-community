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
 
  week = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sábado','Domingo'];

   months: any = [
     {name:'Enero',days:this.range(31),code:'01'},
     {name:'Febrero',days:this.range(28),code:'02'},
     {name:'Marzo',days:this.range(31),code:'03'},
     {name:'Abril',days:this.range(30),code:'04'},
     {name:'Mayo',days:this.range(31),code:'05'},
     {name:'Junio',days:this.range(30),code:'06'},
     {name:'Julio',days:this.range(31),code:'07'},
     {name:'Agosto',days:this.range(30),code:'08'},
     {name:'Septiembre',days:this.range(31),code:'09'},
     {name:'Octubre',days:this.range(30),code:'10'},
     {name:'Noviembre',days:this.range(31),code:'11'},
     {name:'Diciembre',days:this.range(30),code:'12'}
   ]
 
   provinces: any = [
     {name: "Granada",code:0},
     {name: "Málaga",code:1},
     {name: "Sevilla",code:2},
     {name: "Jaén",code:3},
     {name: "Almería",code:4},
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
     //this.cleanCalendar();
 
    //  this.events.forEach((e: { province: string;start_date:string;name:string;code: string;room:any;schedule:any;color:any; }) => {
 
    //    e.code = (e.code===null ||e.code === "")?'Sin código':e.code;
    //    let day = e.start_date.trim().substring(0,2);
    //    let province = e.province.trim() //Habrá que quitarlo si quieres añadir la provincia Virtual
 
    //    let id:string = province+'-'+parseInt(day,10);
    //    let td = document.getElementById(id);
 
    //    if (td !== null) {
    //      td.innerHTML+=`
    //      <div style='font-size:10px;border-bottom: 1px solid #dee2e6;background-color:${e.color};
    //      padding-bottom: 1em;margin-bottom: 1em;'>
    //        <p class='eventSelector' style='color:#2274A5;'>${e.code}</p>${e.name}<p style='margin-bottom: 0px;'>
    //          Aulas: ${e.room}
    //        </p><p style='margin-bottom: 0px;'>
    //          Horario: ${e.schedule}
    //        </p>
    //      </div>`;
    //    }
    //  });
    }

    filterEventsByMonth = (events,selectedMonth) => {
      return events.filter(e => {
        let month = e.date.toString().substring(5,7);
        return month == selectedMonth;
      });
  }
}
