import { Injectable } from "@angular/core";
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { HelperApp } from '../../../helpers/helper';
import { ClientModel } from '../model/client.model';
import { ClientRepository } from "../repository/client.repository";

@Injectable({
    providedIn: 'root',
})
export class UpdateClientUsecase
{
    constructor(
        private repository: ClientRepository,
        private helper: HelperApp,
        ) { }

    async execute(client: ClientModel): Promise<any> {

        if(!this.repository.update(client))
            await this.helper.alertMessage(Messenger.headerClients, Messenger.notUpdateData);

        return
    }
}