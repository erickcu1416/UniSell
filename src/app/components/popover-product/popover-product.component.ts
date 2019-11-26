import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover-product',
  templateUrl: './popover-product.component.html',
  styleUrls: ['./popover-product.component.scss'],
})
export class PopoverProductComponent implements OnInit {

  constructor(private router: Router, private popoverController: PopoverController) { }

  ngOnInit() {}

  goToHome() {
    this.popoverController.dismiss();
    this.router.navigateByUrl('');
  }

}
