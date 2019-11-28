import { AuthGuard } from './../utils/guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './tab2/tab2.module#Tab2PageModule',
    canActivate: [ AuthGuard ]
  },
  {
    path: 'tab3/:type',
    loadChildren: './tab3/tab3.module#Tab3PageModule',
    canActivate: [ AuthGuard ]
  },
  {
    path: 'sell',
    loadChildren: () => import('./pages/sell/sell.module').then( m => m.SellPageModule),
    canActivate: [ AuthGuard ]

  },
  {
    path: 'pay',
    loadChildren: () => import('./pages/pay/pay.module').then( m => m.PayPageModule),
    canActivate: [ AuthGuard ]

  },
  {
    path: 'select-pay',
    loadChildren: () => import('./pages/select-pay/select-pay.module').then( m => m.SelectPayPageModule),
    canActivate: [ AuthGuard ]

  },
  {
    path: 'form-add-product/:type',
    loadChildren: () => import('./pages/form-add-product/form-add-product.module').then( m => m.FormAddProductPageModule),
    canActivate: [ AuthGuard ]

  },
  {
    path: 'thankyou',
    loadChildren: () => import('./pages/thankyou/thankyou.module').then( m => m.ThankyouPageModule),
    canActivate: [ AuthGuard ]

  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'my-sales',
    loadChildren: () => import('./pages/my-sales/my-sales.module').then( m => m.MySalesPageModule)
  },
  {
    path: 'membership',
    loadChildren: () => import('./pages/membership/membership.module').then( m => m.MembershipPageModule)
  },
  {
    path: 'thankyouseller',
    loadChildren: () => import('./pages/thankyouseller/thankyouseller.module').then( m => m.ThankyousellerPageModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
