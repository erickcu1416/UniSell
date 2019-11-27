import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectPayPageRoutingModule } from './select-pay-routing.module';

import { SelectPayPage } from './select-pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectPayPageRoutingModule
  ],
  declarations: [SelectPayPage]
})
export class SelectPayPageModule {}
