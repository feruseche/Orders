import { Injectable } from "@angular/core";
import { ClientModel } from "../model/client.model";
import { HelperApp } from '../../../helpers/helper';
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { SettingModel } from '../../setting/model/setting.model';
import { ClientRepository } from '../repository/client.repository';

@Injectable({
  providedIn: 'root',
})
export class ImportCsvClientUsecase 
{
    loader: any;
    arrayCsv: ClientModel[]=[];

    constructor(
        private helper: HelperApp,
        private repository: ClientRepository,

    ) { }

    async execute($event: any, settingArray: SettingModel[]): Promise<any>
    {
        let files = $event.srcElement.files;

        if (!this.isValidCSVFile(files[0])) {
            this.helper.alertMessage(Messenger.headerClients, Messenger.invalidFileType);
            return
        }

        let input = $event.target;
        let reader = new FileReader();

        reader.readAsText(input.files[0]);

        reader.onload = () => {
            let csvData = reader.result; 
            let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
            this.getDataRecordsArrayFromCSVFile(csvRecordsArray, settingArray);
          };
          
        reader.onerror = () => {
            return this.helper.alertMessage(Messenger.headerClients, Messenger.errorReadFile);
        };
        
        //this.repository.import(this.arrayCsv);
        return this.arrayCsv;
    }

    private isValidCSVFile(file: any): boolean {
        return file.name.endsWith('.csv');
    }

    private getDataRecordsArrayFromCSVFile(csvRecordsArray: any, settingArray: SettingModel[]): void{

        for (
          let i = <number>settingArray['InicioDataCsvClientes'];
          i < csvRecordsArray.length;
          i++
        ) {
          let csvRecord = csvRecordsArray[i].split(';');
    
          if (csvRecord.length >= 5) {
            let newRecord: ClientModel = new ClientModel();
            newRecord.foto = '';
            newRecord.codigo = csvRecord[settingArray['ColumnaCodigoClientes']];
            newRecord.rif = csvRecord[settingArray['ColumnaRifClientes']];
            newRecord.nombre = csvRecord[settingArray['ColumnaNombreClientes']];
            newRecord.celular = csvRecord[settingArray['ColumnaCelularClientes']];
            newRecord.direccion = csvRecord[settingArray['ColumnaDireccionClientes']];
            for(let x = 1; x < 3; x++) {
              newRecord.codigo = newRecord.codigo.replace('"','');
              newRecord.rif = newRecord.rif.replace('"','');
              newRecord.nombre = newRecord.nombre.replace('"','');
              newRecord.celular = newRecord.celular.replace('"','');
              newRecord.direccion = newRecord.direccion.replace('"','');
            }
            this.arrayCsv.push(newRecord); 
          }
        }

        this.arrayCsv.sort(
          (firstObject: ClientModel, secondObject: ClientModel) =>
          firstObject.nombre > secondObject.nombre ? 1 : -1
        );

      }
}
