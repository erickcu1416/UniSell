import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThankyousellerPageRoutingModule } from './thankyouseller-routing.module';

import { ThankyousellerPage } from './thankyouseller.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThankyousellerPageRoutingModule
  ],
  declarations: [ThankyousellerPage]
})
export class ThankyousellerPageModule {}
