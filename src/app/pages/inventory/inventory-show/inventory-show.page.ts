import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { AlertController, ModalController } from '@ionic/angular';
import { HelperApp } from 'src/app/helpers/helper';
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { SettingModel } from '../../setting/model/setting.model';
import { ImageCameraUsecase } from '../../shared/application/image.camera.usecase';
import { ImageGaleryUsecase } from '../../shared/application/image.gallery.usecase';
import { RemoveFileUsecase } from '../../shared/application/remove.file.usecase';
import { InventoryModel } from '../model/inventory.model';
import { DeleteProductUsecase } from '../application/delete.product.usecase';

@Component({
  selector: 'app-inventory-show',
  templateUrl: './inventory-show.page.html',
  styleUrls: ['./inventory-show.page.scss'],
  providers: [WebView],
})
export class InventoryShowPage implements OnInit {
  @Input() productShow!: InventoryModel;
  @Input() setting!: SettingModel[]; 

  safeImg: any;
  deleted: boolean = false;

  constructor(
    private helper: HelperApp,
    private modal: ModalController,
    private alert: AlertController,
    private webView: WebView,
    private sanitizer: DomSanitizer,
    private removeFileUsecase: RemoveFileUsecase,
    private imageGaleryUsecase: ImageGaleryUsecase,
    private imageCameraUsecase: ImageCameraUsecase,
    private deleteProductUsecase: DeleteProductUsecase,
  ) {}

  ngOnInit() {
    if(this.productShow.foto){
      this.safeImg = this.sanitizer.bypassSecurityTrustUrl(
        this.webView.convertFileSrc(this.productShow.foto));
    } 
  }

  async confirmDelete(): Promise<any> {
    const alert = await this.alert.create({
      header: Messenger.headerInventory,
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
            this.removeFoto()
          },
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  async removeFoto(): Promise<any> {

    if(this.productShow.foto=='') return;
    
    if(this.removeFileUsecase.execute(this.productShow.foto,Messenger.pathProductsImg))
      this.productShow.foto = '';
    else
      this.helper.alertMessage(Messenger.headerInventory, Messenger.notDeleteData);

  }

  async getFotoCamera() {
    
    this.removeFoto();

    const storedPhoto = await this.imageCameraUsecase.execute(Messenger.pathProductsImg,this.setting);
    
    const displayImage = this.webView.convertFileSrc(storedPhoto);
    const safeImg = this.sanitizer.bypassSecurityTrustUrl(displayImage);

    this.safeImg = safeImg;
    this.productShow.foto = storedPhoto; 
  }

  async getFotoGallery() {

    this.removeFoto();

    const storedPhoto = await this.imageGaleryUsecase.execute(Messenger.pathProductsImg, this.setting);

    const displayImage = this.webView.convertFileSrc(storedPhoto);
    const safeImg = this.sanitizer.bypassSecurityTrustUrl(displayImage);

    this.safeImg = safeImg;
    this.productShow.foto = storedPhoto;
  }

  async confirmRemove(): Promise<void> {
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
            this.removeProduct()
          },
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  async removeProduct() {
    await this.helper.loading(Messenger.deletingData, 500);
    this.deleteProductUsecase.execute(this.productShow.codigo);
    this.deleted = true;
    this.close();
  }

  public close(): void {
    this.modal.dismiss({
      product: this.productShow,
      deleted: this.deleted,
    });
  }

}
