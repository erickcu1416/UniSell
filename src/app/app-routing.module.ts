import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './tab2/tab2.module#Tab2PageModule'
  },
  {
    path: 'tab3',
    loadChildren: './tab3/tab3.module#Tab3PageModule'
  },  {
    path: 'sell',
    loadChildren: () => import('./pages/sell/sell.module').then( m => m.SellPageModule)
  },
  {
    path: 'pay',
    loadChildren: () => import('./pages/pay/pay.module').then( m => m.PayPageModule)
  },
  {
    path: 'select-pay',
    loadChildren: () => import('./pages/select-pay/select-pay.module').then( m => m.SelectPayPageModule)
  },
  {
    path: 'form-add-product',
    loadChildren: () => import('./pages/form-add-product/form-add-product.module').then( m => m.FormAddProductPageModule)
  },
  {
    path: 'thankyou',
    loadChildren: () => import('./pages/thankyou/thankyou.module').then( m => m.ThankyouPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
