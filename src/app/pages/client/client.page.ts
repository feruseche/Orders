import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';
import { AlertController, IonContent, IonInfiniteScroll, IonItemGroup, IonList, ModalController } from '@ionic/angular';

import { HelperApp } from '../../helpers/helper';
import { MessengerService as Messenger } from '../../helpers/messenger.service';

import { SettingModel } from '../setting/model/setting.model';
import { ClientModel } from './model/client.model';

import { ClientShowPage } from './client-show/client-show.page';

import { Router } from '@angular/router';
import { ReadSettingUsecase } from '../setting/application/read.setting.usecase';
import { DeleteClientUsecase } from './application/delete.client.usecase';
import { ImportCsvClientUsecase } from './application/import.csv.client.usecase';
import { ReadByIdClientUsecase } from './application/read.byid.client.usecase';
import { ReadClientCloudUsecase } from './application/read.client.cloud.usecase';
import { ReadClientUsecase } from './application/read.client.usecase';
import { ResetClientUsecase } from './application/reset.client.usecase';
import { SaveCLientUsecase } from './application/save.client.usecase';
import { StoreCLientUsecase } from './application/store.client.usecase';
import { SyncClientUsecase } from './application/sync.client.usecase';
import { UpdateClientUsecase } from './application/update.client.usecase';
import { UpdateClientCloudUsecase } from './application/update.client.cloud.usecase';

@Component({
  selector: 'app-client', 
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'], 
  providers: [ WebView, File ], 
})
export class ClientPage implements OnInit {
  name = 'Angular ' + VERSION.major;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild('lista') lista: IonList;
  @ViewChild('ItemId') ItemId: IonItemGroup;
  @ViewChild('csvReader') csvReader: any;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  settingArray: SettingModel[]=[];
  clientArray: ClientModel[]=[];
  dataArray: ClientModel[]=[];
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
    private file: File,
    private router: Router,

    private readSettingUsecase: ReadSettingUsecase,
    
    private importCsvClientUsecase: ImportCsvClientUsecase,
    private syncClientUsecase: SyncClientUsecase,
    private resetClientUsecase: ResetClientUsecase,

    private readClientUsecase: ReadClientUsecase,
    private readClientCloudUsecase: ReadClientCloudUsecase,
    private readByIdClientUsecase: ReadByIdClientUsecase,
    private storeClientUsecase: StoreCLientUsecase,
    private updateClientUsecase: UpdateClientUsecase,
    private deleteClientUsecase: DeleteClientUsecase,
    private saveClientUsecase: SaveCLientUsecase,
    private uploadClientsCloud: UpdateClientCloudUsecase,
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
    this.clientArray = [];
    this.dataArray = [];
    
    this.clientArray = this.readClientUsecase.execute();
    
    this.nreg = this.clientArray.length || 0;
    this.dataArray = this.clientArray.slice(0, this.lote);
  }

  async loadViewCloud() {

    await this.helper.loading(Messenger.downloadingData, 2000);
   
    this.clientArray = [];
    this.dataArray = [];

    this.clientArray = this.readClientCloudUsecase.execute();

    setTimeout(async () => {
      if(this.clientArray.length>0){
        this.saveClientUsecase.execute(this.clientArray);
        this.nreg = this.clientArray.length;
        this.dataArray = this.clientArray.slice(0, this.lote);
        await this.helper.alertMessage(Messenger.headerClients, Messenger.dataDownloadedOk);
      }        
    }, 2000);    
  }

  uploadClients() {
    this.helper.loading(Messenger.uploadingData,2000);
    this.clientArray.forEach(
      (c: ClientModel) => { this.uploadClientsCloud.execute(c) }
    );
  }

  changeSecurityRutaFoto(ruta: any): any {
    const safeImg = this.sanitizer.bypassSecurityTrustUrl(this.webView.convertFileSrc(ruta));
    return safeImg;
  }

  async probarCsv() {
    let cabeceraClients: string[] = [
      'foto',
      'codigo',
      'rif',
      'nombre',
      'direccion',
      'celular',
    ];
    let arrayClients: ClientModel[] = this.clientArray;
    let csvData = this.helper.ConvertToCSV(arrayClients, cabeceraClients);
    let blob = new Blob(['\ufeff' + csvData], {
      type: 'text/csv;charset=utf-8;',
    });
    
    await this.file.writeFile(
      this.file.externalApplicationStorageDirectory + Messenger.pathClientsDB,
      'clientesApp.csv',
      blob
    );
  }

  searchClient(): void {
    if(!this.search) {
      this.search = true; 
      this.dataArray = this.clientArray.slice(0,this.lote);
      this.infiniteScroll.disabled = true;
    }    
    this.content.scrollToTop(500);
  }

  onKeyUpEvent(event: any): void {
    const letras = event.target.value;
    if(letras.length >= 3) {
      let expresion = new RegExp(`${letras}.*`, 'i');
      this.dataArray = this.clientArray.filter(
        (r) => expresion.test(r.nombre)
      );
      this.nreg = this.dataArray.length;
    };
  }

  closeSearch(): void {
    this.dataArray = this.clientArray.slice(0,this.lote);
    this.nreg = this.clientArray.length;
    this.search = false;
    this.infiniteScroll.disabled = false;
  }

  async uploadListener($event: any){

    this.helper.loader = await this.helper.loading(Messenger.importingData, 1000);
    this.dataArray = [];

    this.clientArray = await this.importCsvClientUsecase.execute($event, this.settingArray);

    //this.helper.loader = await this.helper.loading(Messenger.savingData, 1000);
    this.nreg = this.clientArray.length;
    this.dataArray = this.clientArray.slice(0,this.lote);
  }

  async sync(arrayNew: ClientModel[]): Promise<any> {
    //const arraySync: ClientModel[] = await this.syncClientUsecase.execute(arrayImported, this.clientArray);
    return await this.saveClientUsecase.execute(arrayNew);
  }

  async save(client: ClientModel): Promise<any> {
    this.helper.loader = await this.helper.loading(Messenger.savingData, 250);
    await this.storeClientUsecase.execute(client);
  } 

  async update(client: ClientModel): Promise<any> {
    //this.helper.loader = await this.helper.loading(Messenger.updatingData, 125);
    await this.updateClientUsecase.execute(client);
  }

  async confirmReset(): Promise<void> {
    const alert = await this.alert.create({
      header:  Messenger.headerClients,
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
            this.resetClient();
          },
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }
  
  async resetClient() {

    this.helper.loader = await this.helper.loading(Messenger.deletingData, 2000);
    this.clientArray = [];      
    this.dataArray = [];
    this.nreg = 0;
    await this.resetClientUsecase.execute();
  }

  loadDataScroll(event: any) {
    if(!this.search) {
      setTimeout(() => {
        this.paginate += this.lote;
        this.dataArray = this.clientArray.slice(0,this.paginate);
        if (this.dataArray.length === this.clientArray.length) {
          event.target.disabled = true;
        }
        event.target.complete();
      }, 200);
    }
  }

  async swipeEvent(event: any, item: any, client: ClientModel): Promise<any> {
    if(event.detail.side == 'start'){
      this.confirmRemove(client.codigo);
    }else{
      //this.helper.alertMessage(Messenger.headerClients, Messenger.inProcess)
      //this.router.navigate(['home/order/new-order'], {state: { key: 1, CLIENT: client, SETTING: this.settingArray }})
      this.orderClient(client);
    }
    this.closeAllItems(item);
  }

  async confirmRemove(id: string): Promise<void> {
    const alert = await this.alert.create({
      header:  Messenger.headerClients,
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
            this.removeClient(id)
          },
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  async removeClient(id:string) {
    await this.helper.loading(Messenger.deletingData, 500);
    this.deleteClientUsecase.execute(id);
    this.loadView();
  }

  orderClient(client: ClientModel) {
    this.router.navigate(['home/order/new-order'], 
    {state: { key: 1, CLIENT: client }});
  }

  closeAllItems(item: any): void {
    let a = Array.prototype.slice.call(item.el.children)
    a.map((val: any) => val.close());
  }

  async showClient(client: ClientModel, setting: SettingModel[], index: number): Promise<void> {

    const clientShow: ClientModel = this.readByIdClientUsecase.execute(client.codigo);
    
    const modal = await this.modal.create({
      component: ClientShowPage,
      cssClass: 'my-modal-class',
      componentProps: {
        clientShow,
        setting,
      },
    });

    await modal.present();  
    const { data } = await modal.onWillDismiss(); 

    if(!data.deleted) {
      this.dataArray[index] = data.client;
      this.update(data.client);
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
