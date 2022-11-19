import { Injectable } from '@angular/core';
import { ClientModel } from '../../model/client.model';
import { File } from '@ionic-native/file/ngx';
import { MessengerService as Messenger } from '../../../../helpers/messenger.service';
import { ClientRepository } from '../client.repository';

@Injectable({
  providedIn: 'root',
})
export class CreateCsvFileService {
  
  constructor(
    private clients: ClientRepository, 
    private file: File) {
    this.probar();
  }

  async probar() {
    let cabeceraClients: string[] = [
      'codigo',
      'rif',
      'nombre',
      'celular',
      'direccion',
    ];
    //let arrayClients: ClientModel[] = this.clients.clientArray;
    // let csvData = this.ConvertToCSV(arrayClients, cabeceraClients);
    // let blob = new Blob(['\ufeff' + csvData], {
    //   type: 'text/csv;charset=utf-8;',
    // });
    // await this.file.writeFile(
    //   this.file.externalApplicationStorageDirectory + Messenger.pathClientsImg,
    //   'clientes.csv',
    //   blob
    // );
  }

  public downloadFile(
    data: unknown,
    columnHeaders: string[],
    filename = 'data'
  ) {
    let csvData = this.ConvertToCSV(data, columnHeaders);
    let blob = new Blob(['\ufeff' + csvData], {
      type: 'text/csv;charset=utf-8;',
    });
    let dwldLink = document.createElement('a');
    let url = URL.createObjectURL(blob);
    let isSafariBrowser =
      navigator.userAgent.indexOf('Safari') != -1 &&
      navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {
      dwldLink.setAttribute('target', '_blank');
    }
    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', filename + '.csv');
    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  private ConvertToCSV(objArray: any, headerList: string[]) {
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
