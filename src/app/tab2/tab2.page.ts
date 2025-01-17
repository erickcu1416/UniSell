import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private router: Router) {}

  navcart() {
    console.log('NavCar');
  }

  navigate(item) {
    console.log(item);
    this.router.navigateByUrl('tab3');
  }
}
