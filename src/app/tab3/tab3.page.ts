import { PopoverProductComponent } from './../components/popover-product/popover-product.component';
import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public popoverController: PopoverController) {}

  async presentPopover(ev: any) {
    console.log('Hola');
    const popover = await this.popoverController.create({
      component: PopoverProductComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}


