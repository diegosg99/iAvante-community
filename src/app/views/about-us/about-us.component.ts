import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {


  collapse = (id) => {
    let element = document.getElementById(id);
    console.log(element.classList);

    element.classList[0] === 'hidden'? this.setVisible(element): this.setHidden(element);
  }

  setVisible = (element) => {
    element.classList.remove('hidden');
    element.classList.add('visible');
  }

  setHidden = (element) => {
    element.classList.remove('visible');
    element.classList.add('hidden');
  }
}
