import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.component.html',
  styleUrls: ['./other-profile.component.scss']
})
export class OtherProfileComponent {

@Input() user:any;

}
