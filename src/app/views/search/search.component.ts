import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{

  @Input() items:any;
  itemsFiltered:[];
  @Output() data:EventEmitter<any[]> = new EventEmitter();

  cats = {
    members:'members',
    questions: 'questions',
    posts: 'posts',
    events: 'events'  
  }

  constructor() {
  }

  ngOnInit(): void {
    this.filterItems("",);
  }

  filterItems(searchTerm,cat = ""): void {

    this.itemsFiltered = [];

    if (searchTerm === '' || !searchTerm) {
      this.itemsFiltered = this.items;
    }

    if (this.cats[cat] === 'members' && searchTerm !== '') {
      this.itemsFiltered = this.items.filter(item=>{
        console.log(item.fullname);
        console.log(searchTerm);
        return item?.fullname.toLowerCase().includes(searchTerm.toLowerCase())
      })
    }

    this.data.emit(this.itemsFiltered);
  }
}
