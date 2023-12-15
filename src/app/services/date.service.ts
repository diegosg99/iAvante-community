import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class DateService {

    spanishDays:any = {
        Monday: 'Lunes',
        Tuesday: 'Martes',
        Wednesday: 'Miercoles',
        Thursday: 'Jueves',
        Friday: 'Viernes',
        Saturday: 'Sábado',
        Sunday: 'Domingo',
    }

    festives2023:any = [
      '2/1/2','6/1/2','28/2/','6/4/2','7/4/2','1/5/2','15/8/','12/10','1/11/','6/12/','8/12/','25/12'
    ]

    getDayName(date:string) {

        var oneDate = moment(date, 'DD/MM/YYYY');
        var dayName = oneDate.format('dddd');

        return this.spanishDays[dayName];
    }

    transformDate = (date:string="0000-00-00") => { //format: 2023-05-22
        if (date === null) {
          return 0;
        }
        let newDate = "";
        newDate += date.substring(8,10)+'/';
        newDate += date.substring(5,7)+'/';
        newDate += date.substring(0,4);
    
        return newDate;
    }

    isFestive = (date:string) => {
      let festive = false;
      
      let dateNoYear = date.substring(0,5);

      if (this.getDayName(date) === 'S' || this.getDayName(date) ==='D') {
        festive = true;
      }

      if (this.festives2023.find((elem: string)=>{return elem === dateNoYear})) {
        festive = true;
      }
      return festive;
    }
} 