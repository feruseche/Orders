import { Injectable } from "@angular/core";
import { Observable, Subscription } from 'rxjs';
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { HelperApp } from "src/app/helpers/helper";
import { InventoryModel } from '../model/inventory.model';
import { InventoryRepository } from '../repository/inventory.repository';

@Injectable({
    providedIn: 'root',
})
export class ReadProductUsecase
{
    subscription: Subscription;
    productArray: InventoryModel[];

    constructor(
        private repository: InventoryRepository,
        private helper: HelperApp,
        ) { }

    execute(): InventoryModel[] {

        if(!this.repository.getAll()){
            this.helper.alertMessage(Messenger.headerInventory, Messenger.notProductsLoad);
            return
        };
        
        this.subscription = this.repository.observable$.subscribe(
            (data: InventoryModel[]) => {
                this.productArray = data
            });

        this.subscription.unsubscribe();

        this.productArray.sort(
            (firstObject: InventoryModel, secondObject: InventoryModel) =>
            firstObject.foto > secondObject.foto ? -1 : 1
          );      

        return this.productArray;
    }
}