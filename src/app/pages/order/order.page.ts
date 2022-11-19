import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { AlertController, IonInfiniteScroll } from '@ionic/angular';
import { HelperApp } from 'src/app/helpers/helper';
import { MessengerService as Messenger } from '../../helpers/messenger.service';
import { ClientModel } from '../client/model/client.model';
import { InventoryModel } from '../inventory/model/inventory.model';
import { ReadSettingUsecase } from '../setting/application/read.setting.usecase';
import { SettingModel } from '../setting/model/setting.model';
import { DeleteOrderUsecase } from './application/delete.order.usecase';
import { ReadOrderUsecase } from './application/read.order.usecase';
import { ResetOrderUsecase } from './application/reset.order.usecase';
import { OrderModel } from './model/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  providers: [ WebView ], 
})
export class OrderPage implements OnInit {

  name = 'Angular ' + VERSION.major;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild('csvReader') csvReader: any;

  search: boolean;
  settingArray: SettingModel[]=[];
  orderArray: OrderModel[]=[];
  dataArray: OrderModel[]=[];
  clientArray: ClientModel[]=[];
  inventoryArray: InventoryModel[]=[];
  total: number = 0;
  paginate: number;
  lote: number;
  nreg: number;

  constructor(
    private helper: HelperApp,
    private sanitizer: DomSanitizer,
    private webView: WebView,
    private alert: AlertController,
    private router: Router,
    private readSettingUsecase: ReadSettingUsecase,
    private readOrderUsecase: ReadOrderUsecase,
    private deleteOrderUsecase: DeleteOrderUsecase,
    private resetOrderUsecase: ResetOrderUsecase,
  ) 
  {
    this.paginate = 20;
    this.lote = 20;
  }

  ngOnInit() {
    this.loadConfig();

    //this.helper.loading(Messenger.chargingData,200);
    this.loadView();
  }

  loadConfig() {
    this.settingArray = this.readSettingUsecase.execute();
  }

  loadView() {
    this.orderArray = this.readOrderUsecase.execute();

    this.totalPedido();
    this.nreg = this.clientArray.length;
    this.dataArray = this.orderArray.slice(0, this.lote);
  }

  totalPedido(): void {
    this.total = 0;
    this.orderArray.forEach( e => this.total += e.total );
  }

  searchOrder() {
    
  }

  onKeyUpEvent(event: any) {

  }

  closeSearch() {

  }

  async confirmRemove(id: string): Promise<void> {
    const alert = await this.alert.create({
      header:  Messenger.headerOrders,
      message: Messenger.confirmDelete,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.removeOrder(id)
          },
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  async removeOrder(id:string) {
    await this.helper.loading(Messenger.deletingData, 500);
    this.deleteOrderUsecase.execute(id);
    this.loadView();
  }

  orderClient(order: OrderModel) {
    this.router.navigate(['home/order/new-order'], 
    {state: { key: 1, ORDER: order }});
  }

  async confirmReset(): Promise<void> {
    const alert = await this.alert.create({
      header:  Messenger.headerOrders,
      message: Messenger.confirmReset,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.resetOrder();
          },
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }
  
  async resetOrder() {

    this.helper.loader = await this.helper.loading(Messenger.deletingData, 1000);
    this.orderArray = [];      
    this.dataArray = [];
    this.nreg = 0;
    this.totalPedido();
    await this.resetOrderUsecase.execute();
  }

  ionViewWillEnter() {
    this.loadConfig();  
    this.loadView();
  } 

  close() {
    
  }

  changeSecurityRutaFoto(ruta: any): any {
    const safeImg = this.sanitizer.bypassSecurityTrustUrl(this.webView.convertFileSrc(ruta));
    return safeImg;
  }

  loadDataScroll(event: any) {
    if(!this.search) {
      setTimeout(() => {
        this.paginate += this.lote;
        this.dataArray = this.orderArray.slice(0,this.paginate);
        if (this.dataArray.length === this.clientArray.length) {
          event.target.disabled = true;
        }
        event.target.complete();
      }, 200);
    }
  }

}