import { PopoverProductComponent } from './popover-product/popover-product.component';
import { MenuComponent } from './menu/menu.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';


@NgModule({
  entryComponents:[
    PopoverProductComponent,
  ],
  declarations: [
    MenuComponent,
    PopoverProductComponent,
  ],
  exports: [
    MenuComponent,
    PopoverProductComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ]
})
export class ComponentsModule { }
