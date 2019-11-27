import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-pay',
  templateUrl: './select-pay.page.html',
  styleUrls: ['./select-pay.page.scss'],
})
export class SelectPayPage implements OnInit {

  creditCard = '1';
  classVariable = 'head-credit-background';
  endText = '';
  startText = '';

  key = Math.round(Math.random() * 100000000000000);
  constructor(private router: Router) { }

  cards = [
    {
      state: 'ON',
      logo: 'assets/img/visa.png',
      a: '----',
      b:  '----',
      c:  '----',
      d:  '----',
      expires: '-/-',
      bank: ''
    },
  ];

  ngOnInit() {
  }

  change($event) {
    console.log($event);
    console.log(this.creditCard);
    if (this.creditCard === '2') {
      this.classVariable = 'head-background animated fadeIn';
    } else {
      this.classVariable = 'head-credit-background animated fadeIn';
    }
  }

  changeYear($event) {
    console.log($event.detail.value);
    this.endText = $event.detail.value;
    this.cards[0].expires = this.startText + '/' + this.endText;
  }

  changeMouth($event) {
    console.log($event.detail.value);
    this.startText = $event.detail.value;
    this.cards[0].expires = this.startText + '/' + this.endText;
  }

  changeName($event) {
    console.log($event.detail.value);
    this.cards[0].bank = $event.detail.value.toUpperCase();

  }

  ionChange($event) {
    console.log($event.detail.value);
    this.cards[0].a = $event.detail.value.substr(0, 4);
    if ($event.detail.value.toString().length === 0) {
      this.cards[0].a = '----';
    }
    if ($event.detail.value.toString().length > 4) {
      this.cards[0].b = $event.detail.value.substr(4, 4);
    } else {
      this.cards[0].b = '----';
    }

    if ($event.detail.value.toString().length > 8) {
      this.cards[0].c = $event.detail.value.substr(8, 4);
    } else {
      this.cards[0].c = '----';

    }

    if ($event.detail.value.toString().length > 12) {
      this.cards[0].d = $event.detail.value.substr(12, 4);
    } else {
      this.cards[0].d = '----';
    }
    console.log(this.cards[0]);
  }

  goToThanks() {
    this.router.navigateByUrl('thankyou');
  }

}
