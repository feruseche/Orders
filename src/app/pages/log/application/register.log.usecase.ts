import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { HelperApp } from "src/app/helpers/helper";
import { LogRepository } from '../repository/log.repository';
import { LogModel } from "../model/log.model";

@Injectable({
    providedIn: 'root',
})
export class RegisterLogUsecase
{
    constructor(
        private repository?: LogRepository,
        private helper?: HelperApp,
        ) { }

    execute(modulo: string, metodo: string , message: any): Observable<LogModel[]> {

        if(!this.repository.register(modulo, metodo, message)) {
            this.helper.alertMessage(Messenger.headerLog, Messenger.notLogsLoad);
        };
        
        return;      
    }
}