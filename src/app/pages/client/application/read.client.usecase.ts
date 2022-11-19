import { Injectable } from "@angular/core";
import { Subscription } from 'rxjs';
import { HelperApp } from "src/app/helpers/helper";
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { ClientModel } from '../model/client.model';
import { ClientRepository } from "../repository/client.repository";

@Injectable({
    providedIn: 'root',
})
export class ReadClientUsecase
{
    subscription: Subscription;
    clientArray: ClientModel[] = [];

    constructor(
        private repository: ClientRepository,
        private helper: HelperApp,
        ) { }

    execute(): ClientModel[] {
        
        if(!this.repository.getAll()){
            //this.helper.alertMessage(Messenger.headerClients, Messenger.notClientsLoad);
            return
        };

        this.subscription = this.repository.observable$.subscribe(
                            (data: ClientModel[]) => this.clientArray = data);

        this.subscription.unsubscribe();

        this.clientArray.sort(
            (firstObject: ClientModel, secondObject: ClientModel) =>
            firstObject.foto > secondObject.foto ? -1 : 1
          );

        return this.clientArray;
    }
}