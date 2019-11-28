import { PopoverController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-popover-product',
  templateUrl: './popover-product.component.html',
  styleUrls: ['./popover-product.component.scss'],
})
export class PopoverProductComponent implements OnInit, OnDestroy {

  @Input() ev: any = '';
  constructor(private router: Router, 
              private popoverController: PopoverController,
              private navParams: NavParams) { }

  ngOnInit() {
    this.ev = this.navParams.get('product');
    console.log('data', this.ev)
  }

  goToPay() {
    this.popoverController.dismiss();
    this.router.navigate(['pay'], { queryParams: { id: this.ev._id } });
  }

  ngOnDestroy(): void {
  }
}
