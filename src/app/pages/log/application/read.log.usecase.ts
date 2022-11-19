import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { HelperApp } from "src/app/helpers/helper";
import { LogRepository } from '../repository/log.repository';
import { LogModel } from "../model/log.model";

@Injectable({
    providedIn: 'root',
})
export class ReadLogUsecase
{
    constructor(
        private repository: LogRepository,
        private helper: HelperApp,
        ) { }

    execute(): Observable<LogModel[]> {

        if(!this.repository.read()){
            this.helper.alertMessage(Messenger.headerLog, Messenger.notLogsLoad);
            return
        };
        
        return this.repository.getObservable$();      
    }
}