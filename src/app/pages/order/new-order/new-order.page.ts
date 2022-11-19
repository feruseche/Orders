import { Component, Input, OnInit, VERSION, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { AlertController, IonContent, IonInfiniteScroll } from '@ionic/angular';
import { Observable } from 'rxjs';
import { HelperApp } from '../../../helpers/helper';
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { ClientModel } from '../../client/model/client.model';
import { ReadProductUsecase } from '../../inventory/application/read.product.usecase';
import { InventoryModel } from '../../inventory/model/inventory.model';
import { ReadSettingUsecase } from '../../setting/application/read.setting.usecase';
import { SettingModel } from '../../setting/model/setting.model';
import { DeleteOrderUsecase } from '../application/delete.order.usecase';
import { ReadByIdOrderUsecase } from '../application/read.byid.order.usecase';
import { StoreOrderUsecase } from '../application/store.order.usecase';
import { UpdateOrderUsecase } from '../application/update.order.usecase';
import { OrderModel, ProductOrderModel } from '../model/order.model';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss'],
  providers: [ WebView ],
})
export class NewOrderPage implements OnInit {
  name = 'Angular ' + VERSION.major;
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  @Input() clientInput: ClientModel;
  @Input() orderInput: OrderModel;

  observable$: Observable<any>;
  search: boolean = false;
  lote: number = 20;
  paginate: number = 20;
  nreg: number = 0;

  client: ClientModel;
  settingArray: SettingModel[] = [];
  dataArray: InventoryModel[] = [];
  productArray: InventoryModel[] = [];
  orderClient: OrderModel;
  productOrderArray: ProductOrderModel[]=[];

  constructor(
    private webView: WebView,
    private sanitizer: DomSanitizer,
    private helper: HelperApp,
    private alert: AlertController,
    private router: Router,
    private readSettingUsecase: ReadSettingUsecase,
    private readProductUsecase: ReadProductUsecase,
    private readByIdOrderUsecase: ReadByIdOrderUsecase,
    private storeOrderUsecase: StoreOrderUsecase,
    private updateOrderUsecase: UpdateOrderUsecase,
    private deleteOrderUsecase: DeleteOrderUsecase,
    ) { }

  ngOnInit() {

    this.clientInput = history.state.CLIENT;
    this.orderInput = history.state.ORDER;
    
    this.client = new ClientModel();

    if(this.clientInput !== undefined) {
      this.client.codigo = this.clientInput.codigo;
      this.client.nombre = this.clientInput.nombre
      this.client.rif    = this.clientInput.rif;
      this.client.foto   = this.clientInput.foto;
    }else{
      this.client.codigo = this.orderInput.codigo;
      this.client.nombre = this.orderInput.nombre
      this.client.rif    = this.orderInput.rif;
      this.client.foto   = this.orderInput.foto;
    };

    this.loadConfig();
    this.loadOrder();
    this.loadInventory();
  }

  loadConfig() {
    this.settingArray = this.readSettingUsecase.execute();
  }

  loadOrder(): void {
    
    let ORDER = this.readByIdOrderUsecase.execute(this.client.codigo);

    this.orderClient = new OrderModel();

    if(ORDER){      
      this.orderClient = ORDER;
      this.productOrderArray = this.orderClient.products;
    }else{
      this.orderClient.codigo = this.client.codigo;
      this.orderClient.rif = this.client.rif;
      this.orderClient.nombre = this.client.nombre;
      this.orderClient.foto = this.client.foto;
      this.orderClient.total = 0;
      this.orderClient.fecha = new Date();
      this.orderClient.products = [];
      this.productOrderArray = [];
      this.storeOrderUsecase.execute(this.orderClient);  
    } 
  }

  loadInventory(): void {
    this.productArray = this.readProductUsecase.execute();
    this.dataArray = this.productArray.slice(0,this.lote);  
  }

  searchProduct() {
    if(!this.search) {
      this.search = true; 
      this.dataArray = this.productArray.slice(0,this.lote);
      //console.log(this.infiniteScroll.disabled);
    }    
    this.content.scrollToTop(500);
  }

  closeSearch(): void {
    this.dataArray = this.productArray.slice(0,this.lote);
    this.nreg = this.productArray.length;
    this.search = false;
    this.infiniteScroll.disabled = false;
  }

  loadDataScroll(event: any) {
    if(!this.search) {
      event.target.disabled = false;
      setTimeout(() => {
        this.paginate += this.lote;
        this.dataArray = this.productArray.slice(0,this.paginate);
        if (this.dataArray.length === this.productArray.length) {
          event.target.disabled = true;
        }
        event.target.complete();
      }, 200);
    }else{
      event.target.disabled = true;
    }
  }

  onKeyUpEvent(event:any) {
    const letras = event.target.value;
    if(letras.length >= 3) {
      let expresion = new RegExp(`${letras}.*`, 'i');
      this.dataArray = this.productArray.filter(
        (r) => expresion.test(r.nombre)
      );
      this.nreg = this.dataArray.length;
    };
  }

  async swipeEvent(event: any, item: any, id: string): Promise<any> {
    if(event.detail.side == 'start'){
      this.deleteProductOrder(id)
    }else{
      // editar
    }
    this.closeAllItems(item);
  }

  closeAllItems(item: any): void {
    let a = Array.prototype.slice.call(item.el.children)
    a.map((val: any) => val.close());
  }

  async confirmReset(): Promise<void> {
    const alert = await this.alert.create({
      header:  Messenger.headerOrders,
      message: Messenger.confirmDeleteOrder,
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
  
  async resetOrder(): Promise<void> {

    this.helper.loader = await this.helper.loading(Messenger.deletingData, 1000);
    this.productOrderArray = [];
    this.orderClient.products = [];
    this.nreg = 0;
    await this.deleteOrderUsecase.execute(this.orderClient.codigo);
    this.router.navigateByUrl('home/order');
    //await this.updateOrderUsecase.execute(this.orderClient);
    
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
            this.deleteProductOrder(id);
          },
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  deleteProductOrder(id: string): void {
    const PRODUCTS: ProductOrderModel[] = this.productOrderArray.filter((p: ProductOrderModel) => p.codigo !== id);
    this.productOrderArray = PRODUCTS;
    this.orderClient.products = PRODUCTS;
    this.orderClient.total = 0;
    this.productOrderArray.forEach((p: ProductOrderModel) => this.orderClient.total += p.subtotal);

    this.updateOrderUsecase.execute(this.orderClient);
  }

  async selectProductOrder(product: InventoryModel, setting: SettingModel[] ,index: number) {

    const alert = await this.alert.create({
      header: 'PEDIDO',
      subHeader: 'Registrando producto',
      message: product.nombre,
      buttons: ['OK'],
      mode: 'md',
      keyboardClose: true,
      inputs: [
        {
          label: 'Precio 1 :' + product.precio1,
          type: 'radio',
          value: product.precio1,
        },
        {
          label: 'Precio 2 :' + product.precio2,
          type: 'radio',
          value: product.precio2,
        },
        {
          label: 'Precio 3 :' + product.precio3,
          type: 'radio',
          value: product.precio3,
        },
      ],
    });

    await alert.present();
    const { data } = await alert.onDidDismiss(); 

    if(data !== undefined){
      const price: number  = parseFloat(data.values);
      this.registerProductOrder(product, price);  
    }; 
  }

  async registerProductOrder(product: InventoryModel, price: number) {

    const alert = await this.alert.create({
      header: 'PEDIDO',
      subHeader: 'Registrando producto',
      message: product.nombre,
      buttons: ['OK'],
      mode: 'md',
      keyboardClose: true,
      inputs: [
        {
          label: 'Cantidad :',
          placeholder: 'Cantidad',
          type: 'number',
          min: 1,
        },
        {
          label: 'Precio :',
          placeholder: 'Precio',
          type: 'number',
          value: price,
        },
      ],
    });

    await alert.present();
    const { data } = await alert.onDidDismiss(); 
    if(data !== undefined) {
      if(data.values[0]>0){
        if(data.values[1]>0){ 
         
          const newProduct: ProductOrderModel = new ProductOrderModel();
          newProduct.foto = product.foto;
          newProduct.codigo = product.codigo;
          newProduct.nombre = product.nombre;
          newProduct.cantidad = parseFloat(data.values[0]);
          newProduct.precio = parseFloat(data.values[1]);
          newProduct.subtotal = (newProduct.cantidad * newProduct.precio);
      
          this.productOrderArray.push(newProduct);
          console.log(newProduct);
      
          this.orderClient.products = this.productOrderArray;
          this.orderClient.total = 0;
          this.productOrderArray.forEach((p: ProductOrderModel) => this.orderClient.total += p.subtotal);
      
          this.updateOrderUsecase.execute(this.orderClient);
          this.search = false;

        }
      }
    }
  }

  async editProductOrder(product: ProductOrderModel) {

    const alert = await this.alert.create({
      header: 'PEDIDO',
      subHeader: 'Editando producto del pedido',
      message: product.nombre,
      buttons: ['OK'],
      mode: 'md',
      keyboardClose: true,
      inputs: [
        {
          label: 'Cantidad :',
          placeholder: 'Cantidad',
          type: 'number',
          min: 1,
          value: product.cantidad,
        },
        {
          label: 'Precio :',
          placeholder: 'Precio',
          type: 'number',
          value: product.precio,
        },
      ],
    });

    await alert.present();
    const { data } = await alert.onDidDismiss(); 
    if(data !== undefined) {
      if(data.values[0]>0){
        if(data.values[1]>0){ 

          const products: ProductOrderModel[] = this.productOrderArray.filter((p) => p.codigo !== product.codigo );
         
          const editProduct: ProductOrderModel = new ProductOrderModel();
          editProduct.foto = product.foto;
          editProduct.codigo = product.codigo;
          editProduct.nombre = product.nombre;
          editProduct.cantidad = parseFloat(data.values[0]);
          editProduct.precio = parseFloat(data.values[1]);
          editProduct.subtotal = (editProduct.cantidad * editProduct.precio);
      
          products.push(editProduct);

          this.productOrderArray = products;

          console.log(editProduct);
      
          this.orderClient.products = this.productOrderArray;
          this.orderClient.total = 0;
          this.productOrderArray.forEach((p: ProductOrderModel) => this.orderClient.total += p.subtotal);
      
          this.updateOrderUsecase.execute(this.orderClient);

          this.productOrderArray.sort(
            (firstObject: ProductOrderModel, secondObject: ProductOrderModel) =>
            firstObject.nombre > secondObject.nombre ? 1 : -1
          );

          this.search = false;

        }
      }
    }
  }


  changeSecurityRutaFoto(ruta: any): any {
    const safeImg = this.sanitizer.bypassSecurityTrustUrl(this.webView.convertFileSrc(ruta));
    return safeImg;
  }

  ionViewWillEnter() {
    this.loadConfig();
    this.loadOrder();
  }

}
