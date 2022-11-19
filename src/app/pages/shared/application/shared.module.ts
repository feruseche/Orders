import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Camera } from '@ionic-native/camera/ngx';
import { ImageCameraUsecase } from './image.camera.usecase';
import { RemoveFileUsecase } from './remove.file.usecase';
import { File } from '@ionic-native/file/ngx';
import { ImageGaleryUsecase } from './image.gallery.usecase';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [

  ],
  providers: [
    Camera,
    File,
    ImageCameraUsecase,
    RemoveFileUsecase,
    ImageGaleryUsecase,
  ],
})
export class SharedModule { }