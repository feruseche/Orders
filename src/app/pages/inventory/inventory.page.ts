import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { AlertController, IonContent, IonInfiniteScroll, IonItemGroup, IonList, ModalController } from '@ionic/angular';
import { HelperApp } from 'src/app/helpers/helper';
import { MessengerService as Messenger } from '../../helpers/messenger.service';
import { ReadSettingUsecase } from '../setting/application/read.setting.usecase';
import { SettingModel } from '../setting/model/setting.model';

import { InventoryShowPage } from './inventory-show/inventory-show.page';
import { InventoryModel } from './model/inventory.model';

import { DeleteProductUsecase } from './application/delete.product.usecase';
import { ImportCsvInventoryUsecase } from './application/import.csv.product.usecase';
import { ReadByIdProductUsecase } from './application/read.byid.product.usecase';
import { ReadProductUsecase } from './application/read.product.usecase';
import { ResetProductUsecase } from './application/reset.product.usecase';
import { StoreProductUsecase } from './application/store.product.usecase';
import { UpdateProductUsecase } from './application/update.product.usecase';
import { ReadProductCloudUsecase } from './application/read.product.cloud.usecase';
import { SaveProductUsecase } from './application/save.product.usecase';
import { UpdateProductCloudUsecase } from './application/update.product.cloud.usecase';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
  providers: [ WebView ],
})
export class InventoryPage implements OnInit {
  name = 'Angular ' + VERSION.major;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild('lista') lista: IonList;
  @ViewChild('ItemId') ItemId: IonItemGroup;
  @ViewChild('csvReader') csvReader: any;

  settingArray: SettingModel[]=[];
  productArray: InventoryModel[]=[];
  dataArray: InventoryModel[]=[];
  search: boolean = false;
  paginate: number = 20;
  lote: number = 20;
  nreg: number = 0;

  constructor(
    private helper: HelperApp,
    private alert: AlertController,
    private modal: ModalController,
    private sanitizer: DomSanitizer,
    private webView: WebView,

    private readSettingUsecase: ReadSettingUsecase,
    private importCsvInventoryUsecase: ImportCsvInventoryUsecase,
    private resetProductUsecase: ResetProductUsecase,

    private readProductUsecase: ReadProductUsecase,
    private readProductCloudUsecase: ReadProductCloudUsecase,
    private readByIdProductUsecase:ReadByIdProductUsecase,
    private storeProductUsecase: StoreProductUsecase,
    private updateProductUsecase: UpdateProductUsecase,
    private deleteProductUsecase: DeleteProductUsecase,
    private saveProductUsecase: SaveProductUsecase,
    private uploadProductsCloud: UpdateProductCloudUsecase,
  ) 
  { }
  
  async ngOnInit() {
    this.loadConfig();
    await this.helper.loading(Messenger.chargingData, 250);
    this.loadView();  
  }

  loadConfig() {
    this.settingArray = this.readSettingUsecase.execute();
  }

  async loadView() {
    //await this.helper.loading(Messenger.chargingData, 250);
    this.productArray = [];
    this.dataArray = [];
    
    this.productArray = this.readProductUsecase.execute();
    
    this.nreg = this.productArray.length || 0;
    this.dataArray = this.productArray.slice(0, this.lote);
  }

  async loadViewCloud() {

    await this.helper.loading(Messenger.downloadingData, 1000);
   
    this.productArray = [];
    this.dataArray = [];

    this.productArray = this.readProductCloudUsecase.execute();

    setTimeout(async () => {
      if(this.productArray.length>0){
        this.saveProductUsecase.execute(this.productArray);
        this.nreg = this.productArray.length;
        this.dataArray = this.productArray.slice(0, this.lote);
        await this.helper.alertMessage(Messenger.headerInventory, Messenger.dataDownloadedOk);
      }        
    }, 1000);    
  }

  uploadProducts() {
    this.helper.loading(Messenger.uploadingData,10000);
    this.productArray.forEach(
      (p: InventoryModel) => { this.uploadProductsCloud.execute(p) }
    );
  }


  changeSecurityRutaFoto(ruta: any): any {
    const safeImg = this.sanitizer.bypassSecurityTrustUrl(this.webView.convertFileSrc(ruta));
    return safeImg;
  }

  async sync(arrayNew: InventoryModel[]): Promise<any> {
    //const arraySync: ClientModel[] = await this.syncClientUsecase.execute(arrayImported, this.clientArray);
    return await this.saveProductUsecase.execute(arrayNew);
  }

  searchProduct(): void {
    if(!this.search) {
      this.search = true; 
      this.dataArray = this.productArray.slice(0,this.lote);
      this.infiniteScroll.disabled = true;
    }    
    this.content.scrollToTop(500);
  }

  onKeyUpEvent(event: any): void {
    const letras = event.target.value;
    if(letras.length >= 3) {
      let expresion = new RegExp(`${letras}.*`, 'i');
      this.dataArray = this.productArray.filter(
        (r) => expresion.test(r.nombre)
      );
      this.nreg = this.dataArray.length;
    };
  }

  closeSearch(): void {
    this.dataArray = this.productArray.slice(0,this.lote);
    this.nreg = this.productArray.length;
    this.search = false;
    this.infiniteScroll.disabled = false;
  }

  async uploadListener($event: any){

    this.helper.loader = await this.helper.loading(Messenger.importingData, 2000);

    this.productArray = await this.importCsvInventoryUsecase.execute($event, this.settingArray);

    //this.helper.loader = await this.helper.loading(Messenger.savingData, 1000);
    this.nreg = this.productArray.length;
    this.dataArray = this.productArray.slice(0,this.lote);

    //this.loader = await this.helper.loading(Messenger.syncData,2000);
    //const arraySync: InventoryModel[] = await this.syncProductUsecase.execute(arrayImported, this.productArray);
  }

  // async sync(arrayImported: InventoryModelCsv[]): Promise<any> {
  //   const arraySync: InventoryModel[] = await this.syncProductUsecase.execute(arrayImported, this.productArray);
  //   this.productArray = arraySync;
  //   this.dataArray = arraySync;
  // }

  async save(product: InventoryModel): Promise<any> {
    this.helper.loader = await this.helper.loading(Messenger.savingData, 250);
    await this.storeProductUsecase.execute(product);
  } 

  async update(product: InventoryModel): Promise<any> {
    this.helper.loader = await this.helper.loading(Messenger.updatingData, 250);
    await this.updateProductUsecase.execute(product);
  }

  async confirmReset(): Promise<void> {
    const alert = await this.alert.create({
      header:  Messenger.headerInventory,
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
            this.resetInventory();
          },
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }
  
  async resetInventory() {

    this.helper.loader = await this.helper.loading(Messenger.deletingData, 2000);
    this.productArray = [];      
    this.dataArray = [];
    this.nreg = 0;
    await this.resetProductUsecase.execute();
  }

  loadDataScroll(event: any) {
    if(!this.search) {
      setTimeout(() => {
        this.paginate += this.lote;
        this.dataArray = this.productArray.slice(0,this.paginate);
        if (this.dataArray.length === this.productArray.length) {
          event.target.disabled = true;
        }
        event.target.complete();
      }, 200);
    }
  }

  async swipeEvent(event: any, item: any, id: string): Promise<any> {
    if(event.detail.side == 'start'){
      this.confirmRemove(id);
    }else{
      this.helper.alertMessage(Messenger.headerInventory, Messenger.inProcess)
    }
    this.closeAllItems(item);
  }

  async confirmRemove(id: string): Promise<void> {
    const alert = await this.alert.create({
      header:  Messenger.headerInventory,
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
            this.removeProduct(id)
          },
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  async removeProduct(id:string) {
    await this.helper.loading(Messenger.deletingData, 500);
    this.deleteProductUsecase.execute(id);
    this.loadView();
  }

  closeAllItems(item: any): void {
    let a = Array.prototype.slice.call(item.el.children)
    a.map((val: any) => val.close());
  }

  async showProduct(product: InventoryModel, setting: SettingModel[], index: number): Promise<void> {

    const productShow: InventoryModel = this.readByIdProductUsecase.execute(product.codigo);

    const modal = await this.modal.create({
      component: InventoryShowPage,
      cssClass: 'my-modal-class',
      componentProps: {
        productShow,
        setting,
      },
    });

    await modal.present();  
    const { data } = await modal.onWillDismiss(); 

    if(!data.deleted) {
      this.dataArray[index] = data.product;
      this.update(data.product);
    }else{
      this.loadView();
    }

  }

  ionViewWillEnter() {
    this.loadConfig();
    this.loadView();
  }

  public doRefresh(event: any): void {

    this.loadView();
    event.target.complete();
  }
}
