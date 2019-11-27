import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormAddProductPageRoutingModule } from './form-add-product-routing.module';

import { FormAddProductPage } from './form-add-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormAddProductPageRoutingModule
  ],
  declarations: [FormAddProductPage]
})
export class FormAddProductPageModule {}
