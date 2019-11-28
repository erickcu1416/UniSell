import { AuthService } from './../../../services/modules/auth.service';
import { IUser } from './../../../utils/interfaces/modules/user.interface';
import { UserRepository } from './../../../repositories/modules/user.repository';
import { BuyService } from './../../../services/modules/buy.service';
import { IBuy } from './../../../utils/interfaces/modules/buy.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-select-pay',
  templateUrl: './select-pay.page.html',
  styleUrls: ['./select-pay.page.scss'],
})
export class SelectPayPage implements OnInit, OnDestroy {

  creditCard = '1';
  classVariable = 'head-credit-background';
  endText = '';
  startText = '';
  sub: any;
  description = '';
  id: any;
  type = '';

  key = Math.round(Math.random() * 100000000000000);
  constructor(private router: Router, 
              private route: ActivatedRoute,
              private _buyService: BuyService,
              private _authRepository: UserRepository,
              private _authService: AuthService) { }

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
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.description = params['description'] || '';
        this.id = params.id || '';

        console.log('DESCRIPCION', this.description);
        console.log('ID', this.id);
        console.log('type', this.type);

      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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

  async goToThanks() {

    if (!this.id) {
      console.log('NO EXISTE EL ID');
      const us: any = await this._authService.getUser();

      const user: IUser = {
        _id: us._id,
        member: true,
      };

      await this._authRepository.updateUserFirestore(user).then(
        data => {
            console.log('data auth', data);
            this.router.navigateByUrl('thankyouseller');
        }
      );
      return;

    }

    const buy: IBuy = {
      description: this.description,
      idProduct: this.id,
    };

    this._buyService.addBuy(buy).then(
      (res) => {
        if (res) {
          this.router.navigateByUrl('thankyou');
        }
      }
    );
  }

}
