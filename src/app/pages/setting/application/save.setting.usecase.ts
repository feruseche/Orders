import { Injectable } from "@angular/core";
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { HelperApp } from '../../../helpers/helper';
import { SettingRepository } from "../repository/setting.repository";
import { SettingModel } from "../model/setting.model";

@Injectable({
    providedIn: 'root',
})
export class SaveSettingUsecase
{
    constructor(
        private repository: SettingRepository,
        private helper: HelperApp,
        ) { }

    async execute(settingArray: SettingModel[]): Promise<any> {

        if(!this.repository.save(settingArray)){
            await this.helper.alertMessage(Messenger.headerSetting, Messenger.notSaveData);
        };

        return
    }
}