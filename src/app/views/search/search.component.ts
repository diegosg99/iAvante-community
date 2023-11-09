import { Component, Input, OnInit, Output,EventEmitter,ViewChild,ElementRef } from '@angular/core';
import { Observable, Subject, subscribeOn } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{

  @Input() cat:any;  
  @Input() items:any;

  @ViewChild('selectCats',{static:false})selectInput: ElementRef;

  itemsFiltered:[];

  @Output() data:EventEmitter<any[]> = new EventEmitter();

  cats = {
    members:{fullname:'Nombre',role:'Rol',proffesion:'Profesion'},
    posts:{title:'Título'},
    questions:{title:'Título'},
    events:{fullname:'Nombre',role:'Rol',proffesion:'Profesion'},
  }

  props = {
    members:'members',
    questions: 'questions',
    posts: 'posts',
    events: 'events'  
  }

  constructor() {
  }

  ngOnInit(): void {
    this.init();
  }

  init = () => {
    if (this.cat ==='questions') {
      this.data.emit(this.items.recent);
    }else{
      this.data.emit(this.items);
    }
  }

  filterItems(searchTerm,prop = ""): void {

    let criteria = this.selectInput.nativeElement.selectedOptions[0].value;

    if (this.cat ==='questions') {
      this.itemsFiltered = this.items.recent;
    }else{
      this.itemsFiltered = this.items;
    }

    if (this.props[prop] === 'members' && searchTerm !== '') {
      this.itemsFiltered = this.items.filter(item=>{
        return item?.[criteria]?.toLowerCase().includes(searchTerm.toLowerCase())
      })
    }

    if (this.props[prop] === 'questions' && searchTerm !== '') {
      //TODO Cambiar todas las preguntas por recientes solo, al lado las más frecuentadas
      this.itemsFiltered = this.items.recent.filter(item=>{
        return item?.[criteria]?.toLowerCase().includes(searchTerm.toLowerCase())
      })
    }

    if (this.props[prop] === 'posts' && searchTerm !== '') {
      this.itemsFiltered = this.items.filter(item=>{
        return item?.fullname.toLowerCase().includes(searchTerm.toLowerCase())
      })
    }

    if (this.props[prop] === 'events' && searchTerm !== '') {
      this.itemsFiltered = this.items.filter(item=>{
        return item?.fullname.toLowerCase().includes(searchTerm.toLowerCase())
      })
    }

    console.log(this.itemsFiltered);

    this.data.emit(this.itemsFiltered);
  }
}
