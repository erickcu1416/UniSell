import { IBuy } from './../../../utils/interfaces/modules/buy.interface';
import { AuthService } from './../../../services/modules/auth.service';
import { BuyService } from './../../../services/modules/buy.service';
import { PopoverController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover-sell',
  templateUrl: './popover-sell.component.html',
  styleUrls: ['./popover-sell.component.scss'],
})
export class PopoverSellComponent implements OnInit {

  product: any;
  buys: IBuy [] = [];
  constructor(
              private popoverController: PopoverController,
              private navParams: NavParams,
              private _authService: AuthService,
              private _buyService: BuyService) { }

  ngOnInit() {
    this.product = this.navParams.get('product');
    this._buyService.getBuysByIdProduct(this.product._id).subscribe(
      async (res) => {
        this.buys = res;
        await this.buys.map(
          x => {
            const user = this._authService.getUserById(x.idUser)
            .subscribe(
              r => {
                x.userName = r.username;
              }
            )
            return x;
          }
        );
        console.log('BUYS', this.buys);
      }
    )
    console.log('data', this.product)
  }

}
