import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
})

export class SellPage implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.menuCtrl.enable(true);
  }

  constructor(private menuCtrl: MenuController, private router: Router) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

    goToSell() {
      this.router.navigateByUrl('form-add-product');
    }

}
