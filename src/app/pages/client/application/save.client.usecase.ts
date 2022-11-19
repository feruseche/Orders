import { ClientRepository } from '../repository/client.repository';
import { HelperApp } from '../../../helpers/helper';
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { ClientModel } from '../model/client.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SaveCLientUsecase {

    constructor(
        private helper: HelperApp,
        private repository: ClientRepository,
    ) { }

    async execute(clients: ClientModel[]): Promise<any> {

        if(!this.repository.import(clients))
            this.helper.alertMessage(Messenger.headerClients, Messenger.notSaveData);
        
        return
    }
}