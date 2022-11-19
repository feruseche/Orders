import { Injectable } from "@angular/core";
import { Subscription } from 'rxjs';
import { HelperApp } from "src/app/helpers/helper";
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { ClientModel } from '../model/client.model';
import { ClientRepositoryCloud } from '../repository/client.repository .cloud';

@Injectable({
    providedIn: 'root',
})
export class ReadClientCloudUsecase
{
    subscription: Subscription;
    clientArray: ClientModel[] = [];

    constructor(
        private repositoryCloud: ClientRepositoryCloud,
        private helper: HelperApp,
        ) { }

    execute(): ClientModel[] {
        
        if(!this.repositoryCloud.getAll()){
            this.helper.alertMessage(Messenger.headerClients, Messenger.notClientsCloud);
            return
        };

        this.subscription = this.repositoryCloud.observable$.subscribe(
                            (dataCloud: ClientModel[]) => 
                            this.clientArray = dataCloud);

        this.subscription.unsubscribe();

        this.clientArray.sort(
            (firstObject: ClientModel, secondObject: ClientModel) =>
            firstObject.foto > secondObject.foto ? -1 : 1
          );

        return this.clientArray;
    }
}