import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { AlertController, ModalController } from '@ionic/angular';
import { HelperApp } from '../../../helpers/helper';
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { SettingModel } from '../../setting/model/setting.model';
import { ImageCameraUsecase } from '../../shared/application/image.camera.usecase';
import { ImageGaleryUsecase } from '../../shared/application/image.gallery.usecase';
import { RemoveFileUsecase } from '../../shared/application/remove.file.usecase';
import { ClientModel } from '../model/client.model';
import { Router } from '@angular/router';
import { DeleteClientUsecase } from '../application/delete.client.usecase';

@Component({
  selector: 'app-client-show',
  templateUrl: './client-show.page.html',
  styleUrls: ['./client-show.page.scss'],
  providers: [WebView],
})
export class ClientShowPage implements OnInit {
  @Input() clientShow!: ClientModel;
  @Input() setting!: SettingModel[]; 

  safeImg: any;
  deleted: boolean = false;

  constructor(
    private helper: HelperApp,
    private modal: ModalController,
    private alert: AlertController,
    private webView: WebView,
    private sanitizer: DomSanitizer,
    private router: Router,
    private removeFileUsecase: RemoveFileUsecase,
    private imageGaleryUsecase: ImageGaleryUsecase,
    private imageCameraUsecase: ImageCameraUsecase,
    private deleteClientUsecase: DeleteClientUsecase,
  ) {}

  ngOnInit() {
    if(this.clientShow.foto){
      this.safeImg = this.sanitizer.bypassSecurityTrustUrl(
        this.webView.convertFileSrc(this.clientShow.foto));
    } 
  }

  async confirmDelete(): Promise<any> {
    const alert = await this.alert.create({
      header: Messenger.headerClients,
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

    if(this.clientShow.foto=='') return;
    
    if(this.removeFileUsecase.execute(this.clientShow.foto,Messenger.pathClientsImg))
      this.clientShow.foto = '';
    else
      this.helper.alertMessage(Messenger.headerClients, Messenger.notDeleteData);

  }

  async getFotoCamera() {
    
    this.removeFoto();

    const storedPhoto = await this.imageCameraUsecase.execute(Messenger.pathClientsImg,this.setting);
    
    const displayImage = this.webView.convertFileSrc(storedPhoto);
    const safeImg = this.sanitizer.bypassSecurityTrustUrl(displayImage);

    this.safeImg = safeImg;
    this.clientShow.foto = storedPhoto; 
  }

  async getFotoGallery() {

    this.removeFoto();

    const storedPhoto = await this.imageGaleryUsecase.execute(Messenger.pathClientsImg, this.setting);

    const displayImage = this.webView.convertFileSrc(storedPhoto);
    const safeImg = this.sanitizer.bypassSecurityTrustUrl(displayImage);

    this.safeImg = safeImg;
    this.clientShow.foto = storedPhoto;
  }

  orderClient(client: ClientModel) {
    this.modal.dismiss({
      client: this.clientShow,
    });

    this.router.navigate(['home/order/new-order'], 
    {state: { key: 1, CLIENT: client }});
  }

  async confirmRemove(): Promise<void> {
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
            this.removeClient()
          },
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  async removeClient() {
    await this.helper.loading(Messenger.deletingData, 500);
    this.deleteClientUsecase.execute(this.clientShow.codigo);
    this.deleted = true;
    this.close();
  }

  public close(): void {
    this.modal.dismiss({
      client: this.clientShow,
      deleted: this.deleted,
    });
  }

}
