import { Injectable } from "@angular/core";
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { HelperApp } from '../../../helpers/helper';
import { ClientModel } from '../model/client.model';
import { ClientRepositoryCloud } from "../repository/client.repository .cloud";

@Injectable({
    providedIn: 'root',
})
export class UpdateClientCloudUsecase
{
    constructor(
        private repositoryCloud: ClientRepositoryCloud,
        private helper: HelperApp,
        ) { }

    async execute(client: ClientModel): Promise<any> {

        if(!this.repositoryCloud.update(client))
            await this.helper.alertMessage(Messenger.headerClients, Messenger.notUpdateData);

        return
    }
}