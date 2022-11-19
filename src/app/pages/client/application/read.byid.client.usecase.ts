import { Injectable } from '@angular/core';
import { ClientModel } from '../model/client.model';
import { ClientRepository } from '../repository/client.repository';
import { HelperApp } from '../../../helpers/helper';
import { MessengerService as Messenger } from '../../../helpers/messenger.service';

@Injectable({
    providedIn: 'root',
})
export class ReadByIdClientUsecase
{
    constructor(
        private repository: ClientRepository,
        private helper: HelperApp) 
    { }

    execute(id: string): ClientModel {

        let CLIENT: ClientModel = new ClientModel();
        
        CLIENT = this.repository.getById(id);

        if(!CLIENT) this.helper.alertMessage(Messenger.headerClients, Messenger.notClientsLoad);

        return CLIENT;
    }
}