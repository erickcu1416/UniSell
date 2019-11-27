import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectPayPage } from './select-pay.page';

const routes: Routes = [
  {
    path: '',
    component: SelectPayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectPayPageRoutingModule {}
