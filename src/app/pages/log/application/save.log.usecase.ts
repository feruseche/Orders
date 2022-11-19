import { Injectable } from "@angular/core";
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { HelperApp } from '../../../helpers/helper';
import { LogRepository } from '../repository/log.repository';
import { LogModel } from "../model/log.model";

@Injectable({
    providedIn: 'root',
})
export class SaveLogUsecase
{
    constructor(
        private repository: LogRepository,
        private helper: HelperApp,
        ) { }

    async execute(logArray: LogModel[]): Promise<any> {

        if(!this.repository.save(logArray)){
            await this.helper.alertMessage(Messenger.headerLog, Messenger.notSaveData);
        };

        return
    }
}