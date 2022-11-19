import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientShowPageRoutingModule } from './client-show-routing.module';

import { ClientShowPage } from './client-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientShowPageRoutingModule
  ],
  declarations: [ClientShowPage]
})
export class ClientShowPageModule {}
