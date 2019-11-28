import { PopoverSellComponent } from './../../components/popover-sell/popover-sell.component';
import { PopoverController } from '@ionic/angular';
import { IProduct } from './../../../utils/interfaces/modules/product.interface';
import { AuthService } from './../../../services/modules/auth.service';
import { ProductService } from './../../../services/modules/product.service';
import { Component, OnInit } from '@angular/core';
import DateFormatter from '../../../utils/date.formaters';
import * as moment from 'moment';

@Component({
  selector: 'app-my-sales',
  templateUrl: './my-sales.page.html',
  styleUrls: ['./my-sales.page.scss'],
})
export class MySalesPage implements OnInit {
  products: IProduct [] = [];
  constructor(private _productService: ProductService,
              private _authService: AuthService,
              private popoverController: PopoverController) { }

  ngOnInit() {
    this.getMyProducts();
  }

  async getMyProducts() {
    const user: any = await this._authService.getUser();
    console.log('myUser', user);
    this._productService.getProductsByIdUser(user._id).subscribe(
      data => {
        this.products = data;
        this.products.map(
          x => {
            x.valid_to = DateFormatter.dateFirebaseFormater(x.valid_to);
            x.create_at = DateFormatter.dateFirebaseFormater(x.create_at);
          }
        );
        console.log('PRODUCTS', this.products)
      }
    );
  }

  async presentPopover(ev: any) {
    console.log('Hola');
    const popover = await this.popoverController.create({
      component: PopoverSellComponent,
      event: ev,
      translucent: true,
      componentProps: {
        product: ev
      }
    });
    return await popover.present();
  }

}
