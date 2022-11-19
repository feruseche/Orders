import { Injectable } from "@angular/core";
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { HelperApp } from '../../../helpers/helper';
import { ClientRepository } from "../repository/client.repository";

@Injectable({
    providedIn: 'root',
})
export class ResetClientUsecase
{
    constructor(
        private repository: ClientRepository,
        private helper: HelperApp,
        ) { }

    async execute(): Promise<any> {

        if(!this.repository.reset())
            await this.helper.alertMessage(Messenger.headerClients, Messenger.notDeleteData);

        return
    }
}