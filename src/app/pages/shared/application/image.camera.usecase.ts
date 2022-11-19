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
export class ImageCameraUsecase 
{
    constructor(
        private fileLIB: File,
        private registerLogUsecase: RegisterLogUsecase,
        private camera: Camera,
        private saveSettingUsecase: SaveSettingUsecase,
        private helper: HelperApp,
        ) { }

    async execute(pathFile:string, setting: SettingModel[]): Promise<any> {

        const optionsCamera: CameraOptions = {
            quality: 25,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.CAMERA,
            saveToPhotoAlbum: false,
          };
      
          try {
            const tempImage = await this.camera.getPicture(optionsCamera);
      
            const tempFilename = tempImage.substr(tempImage.lastIndexOf('/') + 1);
            const tempBaseFilesystemPath = tempImage.substr(
              0,
              tempImage.lastIndexOf('/') + 1
            );
            const newBaseFilesystemPath =
              this.fileLIB.externalApplicationStorageDirectory +
              pathFile;
      
            const numberFile: number = setting['ImageId'] + 1;
            const nameFile: string = numberFile.toString() + '.jpg';
            setting['ImageId'] += 1;
            if (!this.saveSettingUsecase.execute(setting)) {
              this.helper.alertMessage(Messenger.headerSetting, Messenger.notSettingsLoad);
            }
      
            await this.fileLIB.copyFile(
              tempBaseFilesystemPath,
              tempFilename,
              newBaseFilesystemPath,
              nameFile
            );
      
            const foto = newBaseFilesystemPath + nameFile;
            return foto;      
          } catch (error) {
            this.helper.alertMessage(Messenger.cameraHeader, Messenger.notGetImage);
            this.registerLogUsecase.execute(
              this.constructor.name,
              this.execute.name,
              error
            );
          }   
    }

}