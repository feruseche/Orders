import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SettingModel } from './model/setting.model';
import { MessengerService as Messenger} from '../../helpers/messenger.service';
import { ReadSettingUsecase } from './application/read.setting.usecase';
import { SaveSettingUsecase } from './application/save.setting.usecase';
import { HelperApp } from '../../helpers/helper';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
  providers: [ StatusBar ],
})
export class SettingPage implements OnInit {

  settingArray: SettingModel[];
  loader: any;
  tema: boolean;
 
  constructor(
    private helper: HelperApp,
    private readSettingUsecase: ReadSettingUsecase,
    private alert: AlertController,
    private statusBar: StatusBar,
    private loadingController: LoadingController, 
    private popover: PopoverController,
    private saveSettingUsecase: SaveSettingUsecase,
    ) 
    { }

  ngOnInit() {
    this.helper.loading(Messenger.chargingData,200);
    this.loadConfig();
  }

  loadConfig() {
    this.settingArray = this.readSettingUsecase.execute();
    (this.settingArray['Tema'] == 'light')
    ? this.tema = false
    : this.tema = true;
  }

  async loading(message: string): Promise<any> {
    this.loader = await this.loadingController.create({
      spinner: 'bubbles',
      message,
    });
    return await this.loader.present(); 
  }

  toggleTheme(event: any) { 
    if(event.detail.checked) {
      this.settingArray['Tema'] = 'dark';
      document.body.setAttribute('color-theme', 'dark');
      this.statusBar.backgroundColorByHexString("#0c2755");
    }else{
      this.settingArray['Tema'] = 'light';
      document.body.setAttribute('color-theme', 'light');
      this.statusBar.backgroundColorByHexString("#0088cc");
    }
    this.save();
  }

  save() {

    this.saveSettingUsecase.execute(this.settingArray)

    this.loading(Messenger.savingData);
    setTimeout(() => {
      this.loader.dismiss();
    }, 1000);
    
  }

  async alertMessage(message: string): Promise<any> {
    const alert = await this.alert.create({
      header: Messenger.headerSetting,
      message,
      buttons: ['OK'],
    });
    return await alert.present();
  }

  ionViewWillEnter() {
    this.loadConfig();
  }
}
