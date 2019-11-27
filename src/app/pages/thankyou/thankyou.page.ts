import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.page.html',
  styleUrls: ['./thankyou.page.scss'],
})
export class ThankyouPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goHome() {
    this.router.navigateByUrl('');
  }

}
