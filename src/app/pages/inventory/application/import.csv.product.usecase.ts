import { Injectable } from "@angular/core";
import { HelperApp } from '../../../helpers/helper';
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { SettingModel } from '../../setting/model/setting.model';
import { InventoryModel } from '../model/inventory.model';
import { InventoryRepository } from '../repository/inventory.repository';

@Injectable({
  providedIn: 'root',
})
export class ImportCsvInventoryUsecase 
{
    loader: any;
    arrayCsv: InventoryModel[]=[];

    constructor(
        private helper: HelperApp,
        private repository: InventoryRepository,
    ) {    }

    async execute($event: any, settingArray: SettingModel[]): Promise<any>
    {
        let files = $event.srcElement.files;

        if (!this.isValidCSVFile(files[0])) {
            this.helper.alertMessage(Messenger.headerInventory, Messenger.invalidFileType);
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
            return this.helper.alertMessage(Messenger.headerInventory, Messenger.errorReadFile);
        };

        //this.repository.import(this.arrayCsv);
        return this.arrayCsv;
    }

    private isValidCSVFile(file: any): boolean {
        return file.name.endsWith('.csv');
    }

    private getDataRecordsArrayFromCSVFile(csvRecordsArray: any, settingArray: SettingModel[]): void{
        console.log(csvRecordsArray);
        for (
            let i = <number>settingArray['InicioDataCsvInventario'];
            i < csvRecordsArray.length;
            i++
          ) {
            let currentRecord = csvRecordsArray[i].split(';');
      
            if (currentRecord.length >= 7) {
              let newRecord: InventoryModel = new InventoryModel();
              newRecord.foto = '';
              newRecord.codigo = currentRecord[settingArray['ColumnaCodigoInventario']];
              newRecord.nombre = currentRecord[settingArray['ColumnaNombreInventario']];
              newRecord.unidad = currentRecord[settingArray['ColumnaUnidadInventario']];
              newRecord.existencia = currentRecord[settingArray['ColumnaExistenciaInventario']];
              newRecord.precio1 = currentRecord[settingArray['ColumnaPrecio1Inventario']];
              newRecord.precio2 = currentRecord[settingArray['ColumnaPrecio2Inventario']];
              newRecord.precio3 = currentRecord[settingArray['ColumnaPrecio3Inventario']];
              for(let x = 1; x < 3; x++) {
                newRecord.foto = newRecord.foto.replace('"','');
                newRecord.codigo = newRecord.codigo.replace('"','');
                newRecord.nombre = newRecord.nombre.replace('"','');
                newRecord.unidad = newRecord.unidad.replace('"','');
                // newRecord.existencia = newRecord.existencia.replace('"','');
                // newRecord.precio1 = newRecord.precio1.replace('"','');
                // newRecord.precio2 = newRecord.precio2.replace('"','');
                // newRecord.precio3 = newRecord.precio3.replace('"','');
              }
              this.arrayCsv.push(newRecord); 
            }
          }
      
          this.arrayCsv.sort(
            (firstObject: InventoryModel, secondObject: InventoryModel) =>
            firstObject.nombre > secondObject.nombre ? 1 : -1
          );

    }
}
