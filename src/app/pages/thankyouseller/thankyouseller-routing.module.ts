import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThankyousellerPage } from './thankyouseller.page';

const routes: Routes = [
  {
    path: '',
    component: ThankyousellerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThankyousellerPageRoutingModule {}
