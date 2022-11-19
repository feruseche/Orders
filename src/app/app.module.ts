import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientRepository } from './pages/client/repository/client.repository';
import { ClientStorage } from './pages/client/repository/storage/client.storage';
import { InventoryRepository } from './pages/inventory/repository/inventory.repository';
import { InventoryStorage } from './pages/inventory/repository/storage/inventory.storage';
import { OrderRepository } from './pages/order/repository/order.repository';
import { OrderStorage } from './pages/order/repository/storage/order.storage';
import { SettingRepository } from './pages/setting/repository/setting.repository';
import { SettingStorage } from './pages/setting/repository/storage/setting.storage';
import { LogRepository } from './pages/log/repository/log.repository';
import { LogStorage } from './pages/log/repository/storage/log.storage';
import { SharedModule } from './pages/shared/application/shared.module';
import { ClientFirebase } from './pages/client/repository/firebase/client.firebase';
import { ClientRepositoryCloud } from './pages/client/repository/client.repository .cloud';
import { environment } from 'src/environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { HttpClientModule } from '@angular/common/http';
import { InventoryRepositoryCloud } from './pages/inventory/repository/inventory.repository.cloud';
import { InventoryFirebase } from './pages/inventory/repository/firebase/inventory.firebase';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.FIREBASE)),
  ],
  providers: [
    Platform,
    { provide: ClientRepository, useClass: ClientStorage },
    { provide: ClientRepositoryCloud, useClass: ClientFirebase },
    { provide: InventoryRepository, useClass: InventoryStorage },
    { provide: InventoryRepositoryCloud, useClass: InventoryFirebase },
    { provide: OrderRepository, useClass: OrderStorage },
    { provide: SettingRepository, useClass: SettingStorage },
    { provide: LogRepository, useClass: LogStorage },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
