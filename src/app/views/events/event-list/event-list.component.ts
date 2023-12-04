import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {

  eventDates = {}
  maxDate = {
    1: new Date(new Date().setMonth(new Date().getMonth() + 11)),
    2: new Date(new Date().setMonth(new Date().getMonth() + 10)),
    3: new Date(new Date().setMonth(new Date().getMonth() + 9))
  }

  @ViewChild('calendar',{static:false})flatpickr: ElementRef;

  constructor() {
    this.flatpickr.nativeElement.flatpickr({
      inline: true,
      minDate: 'today',
      maxDate: this.maxDate[3]
    ,
      showMonths: 1,
      enable: Object.keys(this.eventDates),
      disableMobile: "true",
      onChange: function(date, str, inst) {
        var contents = '';
        if(date.length) {
            for(let i=0; i < this.eventDates[str].length; i++) {
            contents += '<div class="event"><div class="date">' + this.flatpickr.nativeElement.flatpickr.formatDate(date[0], 'l J F') + '</div><div class="location">' + this.eventDates[str][i] + '</div></div>';
          }
        }
        this.flatpickr.nativeElement.innerHTML = contents;
      },
      locale: {
        weekdays: {
          shorthand: ["S", "M", "T", "W", "T", "F", "S"],
          longhand: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ]
        }
      }
    })
  }

  // let day3 = formatDate(new Date(new Date().setDate(new Date().getDate() + 0)))
  // eventDates[day3] = [
  //   'Annual Training Camp-II has been conducted in the campus',
  // ]
  // let day2 = formatDate(new Date(new Date().setDate(new Date().getDate() + 10)))
  // eventDates[day2] = [
  //   'End of Annual Training Camp-II',
  // ]
  
  // set maxDates
  
  
  
  // eventCaledarResize($(window));
  // $(window).on('resize', function() {
  //   eventCaledarResize($(this))
  // })
  
  eventCaledarResize = (el) => {
    let width = el.width()
    if(this.flatpickr.nativeElement.selectedDates.length) {
      this.flatpickr.nativeElement.flatpickr.clear()
    }
    if(width >= 992 && this.flatpickr.nativeElement.flatpickr.config.showMonths !== 3) {
      this.flatpickr.nativeElement.flatpickr.set('showMonths', 3)
      this.flatpickr.nativeElement.flatpickr.set('maxDate', this.maxDate[3])
    }
    if(width < 992 && width >= 768 && this.flatpickr.nativeElement.flatpickr.config.showMonths !== 2) {
      this.flatpickr.nativeElement.flatpickr.set('showMonths', 2)
      this.flatpickr.nativeElement.flatpickr.set('maxDate', this.maxDate[2])
    }
    if(width < 768 && this.flatpickr.nativeElement.flatpickr.config.showMonths !== 1) {
      this.flatpickr.nativeElement.flatpickr.set('showMonths', 1)
      this.flatpickr.nativeElement.flatpickr.set('maxDate', this.maxDate[1])
      // $('.flatpickr-calendar').css('width', '')
    }
  }
  
  formatDate = (date) => {
      let d = date.getDate();
      let m = date.getMonth() + 1; //Month from 0 to 11
      let y = date.getFullYear();
      return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }
}
