import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryShowPage } from './inventory-show.page';

const routes: Routes = [
  {
    path: '',
    component: InventoryShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryShowPageRoutingModule {}
