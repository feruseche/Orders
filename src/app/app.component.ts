import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { ReadSettingUsecase } from './pages/setting/application/read.setting.usecase';
import { SettingModel } from './pages/setting/model/setting.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [StatusBar],
})
export class AppComponent {

  settingArray: SettingModel[];

  constructor(
    private platform: Platform,
    private router: Router,
    private statusBar: StatusBar,
    private readSettingUsecase: ReadSettingUsecase,
  ) {

    this.settingArray;
    this.initializeApp();  
  }
 
  async initializeApp(): Promise<any> {
    
    this.settingArray = this.readSettingUsecase.execute();

    const Tema = this.settingArray['Tema'];
    document.body.setAttribute('color-theme', Tema); 

    return await this.platform.ready().then(
      () => {
        this.statusBar.show();
        (Tema == 'dark')
          ? this.statusBar.backgroundColorByHexString("#0c2755")
          : this.statusBar.backgroundColorByHexString("#0088cc");
          this.router.navigateByUrl('splash'); 
        });
  }
}
