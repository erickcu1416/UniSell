import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MySalesPageRoutingModule } from './my-sales-routing.module';

import { MySalesPage } from './my-sales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    MySalesPageRoutingModule
  ],
  declarations: [MySalesPage]
})
export class MySalesPageModule {}
