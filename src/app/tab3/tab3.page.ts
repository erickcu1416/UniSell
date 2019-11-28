import { AuthService } from './../../services/modules/auth.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from './../../utils/interfaces/modules/product.interface';
import { ProductService } from './../../services/modules/product.service';
import { PopoverProductComponent } from './../components/popover-product/popover-product.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import DateFormatter from '../../utils/date.formaters';
import * as moment from 'moment';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy {

  type = '';
  private sub: any;
  dateInit = new Date();
  products: IProduct[] = [];
  loader = true;
  private _productsListener: Subscription = new Subscription();

  constructor(public popoverController: PopoverController,
              private productService: ProductService,
              private route: ActivatedRoute,
              private _authService: AuthService) {}

  async ngOnInit() {
    this.sub = await this.route.params.subscribe(params => {
      this.type = params.type;
    });
    this.getProducts();
  }

  async presentPopover(ev: any) {
    console.log('Hola');
    const popover = await this.popoverController.create({
      component: PopoverProductComponent,
      event: ev,
      translucent: true,
      componentProps: {
        product: ev
      }
    });
    return await popover.present();
  }

  async getProducts() {

    this._productsListener = this.productService.getProductsByType(this.type).subscribe(
      (products: IProduct[]) => {
        this.products = products;
        this.products.map(
          x => {
            x.valid_to = DateFormatter.dateFirebaseFormater(x.valid_to);
            x.timeRes = setTimeout(() => {
              moment.utc(moment(this.dateInit, 'DD/MM/YYYY HH:mm:ss').diff(moment(x.timeRes, 'DD/MM/YYYY HH:mm:ss'))).format('HH:mm:ss');
            });
            console.log('x', x);
            this._authService.getUserById(x.idUser).subscribe(
              us => {
                x.userName = us.username;
              }
            );

            return x;
          }
        );

        
        this.products.forEach(element => {
          let a = moment.utc(moment(this.dateInit, 'DD/MM/YYYY HH:mm:ss').diff(moment(element.timeRes, 'DD/MM/YYYY HH:mm:ss'))).format('HH:mm:ss');
          console.log(a);
        });
        this.loader = false;
        console.log('PRODUCTOS', this.products);
      }
    );
  }

  getTimeCount(time: Date) {
    setTimeout(() => {
      return moment.utc(moment(this.dateInit, 'DD/MM/YYYY HH:mm:ss').diff(moment(time, 'DD/MM/YYYY HH:mm:ss'))).format('HH:mm:ss');
    });
  }
  ngOnDestroy(): void {
    this._productsListener.unsubscribe();
  }

  isValid(dateEnd: Date): boolean {
    if (this.dateInit <= dateEnd) {      
      return true;
    } else {
      return false;
    }
  }

}


