import { Injectable } from "@angular/core";
import { File } from '@ionic-native/file/ngx';
import { RegisterLogUsecase } from '../../log/application/register.log.usecase';

@Injectable({
    providedIn: 'root',
})
export class RemoveFileUsecase
{
    constructor(
        private fileLIB: File,
        private registerLogUsecase: RegisterLogUsecase
        ) { }

    async execute(filePath: string, pathRemove: string): Promise<any> {
      try {

            const fileName = filePath.substr(
            filePath.lastIndexOf('/') + 1
            );

            await this.fileLIB.removeFile(
            this.fileLIB.externalApplicationStorageDirectory + pathRemove,
            fileName
            );

            return true;
      } catch (error) {
            this.registerLogUsecase.execute(
            this.constructor.name,
            this.execute.name,
            error.message
            );
            return false;
      }
    }

}