import { Injectable } from "@angular/core";
import { Subscription } from 'rxjs';
import { HelperApp } from "src/app/helpers/helper";
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { InventoryModel } from "../model/inventory.model";
import { InventoryRepositoryCloud } from "../repository/inventory.repository.cloud";

@Injectable({
    providedIn: 'root',
})
export class ReadProductCloudUsecase
{
    subscription: Subscription;
    productArray: InventoryModel[] = [];

    constructor(
        private repositoryCloud: InventoryRepositoryCloud,
        private helper: HelperApp,
        ) { }

    execute(): InventoryModel[] {
        
        if(!this.repositoryCloud.getAll()){
            this.helper.alertMessage(Messenger.headerInventory, Messenger.notProductsCloud);
            return
        };

        this.subscription = this.repositoryCloud.observable$.subscribe(
                            (dataCloud: InventoryModel[]) => 
                            this.productArray = dataCloud);

        this.subscription.unsubscribe();

        this.productArray.sort(
            (firstObject: InventoryModel, secondObject: InventoryModel) =>
            firstObject.foto > secondObject.foto ? -1 : 1
          );

        return this.productArray;
    }
}