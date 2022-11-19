import { Injectable } from "@angular/core";
import { Observable, Subscription } from 'rxjs';
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { HelperApp } from "src/app/helpers/helper";
import { SettingRepository } from '../repository/setting.repository';
import { SettingModel } from "../model/setting.model";

@Injectable({
    providedIn: 'root',
})
export class ReadSettingUsecase
{
    observable$ : Observable<SettingModel[]>;
    subscription: Subscription;
    settingArray: SettingModel[];

    constructor(
        private repository: SettingRepository,
        private helper: HelperApp,
        ) { }

    execute(): SettingModel[] {

        if(!this.repository.read()){
            this.helper.alertMessage(Messenger.headerSetting, Messenger.notSettingsLoad);
            return
        };

        this.observable$ = this.repository.getObservable$();

        this.subscription = this.observable$.subscribe(data => this.settingArray = data);
        this.subscription.unsubscribe();

        return this.settingArray;
    }
}