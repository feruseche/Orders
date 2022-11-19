import { Injectable } from "@angular/core";
import { LoadingController, AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})
export class HelperApp
{
  public loader: any;

  constructor(
      private loadingCtrl: LoadingController,
      private alert: AlertController
      ){ }

  async loading(message: string, duration? : number): Promise<any> {
      this.loader = await this.loadingCtrl.create({
        spinner: 'bubbles',
        message,
        duration
      });
      return this.loader.present(); 
    }

  async alertMessage(header:string, message: string): Promise<any> {
  const alert = await this.alert.create({
      header,
      message,
      buttons: ['OK'],
  });
  return await alert.present();
  }

  ConvertToCSV(objArray: any, headerList: string[]) {
      let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      let str = '';
      let row: string = '';
  
      for (let index in headerList) {
        row += headerList[index] + ';';
      }
      row = row.slice(0, -1);
      str += row + ' ';
      for (let i = 0; i < array.length; i++) {
        let line = '';
        for (let index in headerList) {
          let head = headerList[index];
          line += array[i][head] + ';';
        }
        str += line + ' ';
      }
      return str;
  }

}