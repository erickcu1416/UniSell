import { RegisterFormComponent } from './forms/register-form/register-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './forms/login-form/login-form.component';
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
    LoginFormComponent,
    RegisterFormComponent,
  ],
  exports: [
    MenuComponent,
    PopoverProductComponent,
    LoginFormComponent,
    RegisterFormComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ComponentsModule { }
