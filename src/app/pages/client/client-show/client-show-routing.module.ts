import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientShowPage } from './client-show.page';

const routes: Routes = [
  {
    path: '',
    component: ClientShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientShowPageRoutingModule {}
