import { Injectable } from "@angular/core";
import { File } from '@ionic-native/file/ngx';
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { RegisterLogUsecase } from '../../log/application/register.log.usecase';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { SettingModel } from "../../setting/model/setting.model";
import { SaveSettingUsecase } from '../../setting/application/save.setting.usecase';
import { HelperApp } from '../../../helpers/helper';

@Injectable({
    providedIn: 'root',
})
export class ImageGaleryUsecase
{
    constructor(
        private fileLIB: File,
        private registerLogUsecase: RegisterLogUsecase,
        private camera: Camera,
        private saveSettingUsecase: SaveSettingUsecase,
        private helper: HelperApp,
        ) { }

    async execute(pathFile:string, setting: SettingModel[]): Promise<any> {
        const optionsGallery: CameraOptions = {
            quality: 25,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false,
          };
      
          const numberFile: number = setting['ImageId'] + 1;
          const nameFile: string = numberFile.toString() + '.jpg';
      
          setting['ImageId'] += 1;
          if (!this.saveSettingUsecase.execute(setting)) {
            this.helper.alertMessage(Messenger.headerClients, Messenger.notSettingsLoad);
          }
      
          try {
            const tempImage = await this.camera.getPicture(optionsGallery);
            const rutaPath = this.fileLIB.externalApplicationStorageDirectory + pathFile;
            const foto = rutaPath + nameFile;
            let blobContent = this.b64toBlob(tempImage, 'image/jpeg');
            await this.fileLIB.writeFile(rutaPath, nameFile, blobContent);
            return foto;
          } catch (error) {
            this.helper.alertMessage(Messenger.headerClients, Messenger.notGetImage);
            this.registerLogUsecase.execute(
              this.constructor.name,
              this.execute.name,
              error
            );
          }        
    }

    private b64toBlob(b64Data: any, contentType: string) {
        let sliceSize = 512;
        let byteCharacters = atob(b64Data);
        let byteArrays = [];
    
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          let slice = byteCharacters.slice(offset, offset + sliceSize);
    
          let byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
    
          let byteArray = new Uint8Array(byteNumbers);
    
          byteArrays.push(byteArray);
        }
    
        let blob = new Blob(byteArrays, { type: contentType });
        return blob;
      }

}