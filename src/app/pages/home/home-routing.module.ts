import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'order',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../splash/splash.module').then( m => m.SplashPageModule)
      },
      {
        path: 'client',
        loadChildren: () => import('../client/client.module').then( m => m.ClientPageModule)
      },
      {
        path: 'inventory',
        loadChildren: () => import('../inventory/inventory.module').then( m => m.InventoryPageModule)
      },
      {
        path: 'order',
        loadChildren: () => import('../order/order.module').then( m => m.OrderPageModule)
      },
      {
        path: 'setting',
        loadChildren: () => import('../setting/setting.module').then( m => m.SettingPageModule)
      }    
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
