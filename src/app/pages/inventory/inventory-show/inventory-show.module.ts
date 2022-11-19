import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventoryShowPageRoutingModule } from './inventory-show-routing.module';

import { InventoryShowPage } from './inventory-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryShowPageRoutingModule
  ],
  declarations: [InventoryShowPage]
})
export class InventoryShowPageModule {}
