import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.scss']
})
export class FollowsComponent {

  @Input() posts;
  p=0;

  constructor(){}
  

}
