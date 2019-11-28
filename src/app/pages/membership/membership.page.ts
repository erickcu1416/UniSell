import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.page.html',
  styleUrls: ['./membership.page.scss'],
})
export class MembershipPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToSelectPay() {
    this.router.navigateByUrl('select-pay');
  }

}
