import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-popover-product',
  templateUrl: './popover-product.component.html',
  styleUrls: ['./popover-product.component.scss'],
})
export class PopoverProductComponent implements OnInit, OnDestroy {


  constructor(private router: Router, private popoverController: PopoverController) { }

  ngOnInit() {}

  goToPay() {
    this.popoverController.dismiss();
    this.router.navigateByUrl('pay');
  }

  ngOnDestroy(): void {
  }
}
