import { Injectable } from '@angular/core';
import { HelperApp } from '../../../helpers/helper';
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { InventoryRepository } from '../repository/inventory.repository';
import { InventoryModel } from '../model/inventory.model';

@Injectable({
    providedIn: 'root',
})
export class StoreProductUsecase {

    constructor(
        private helper: HelperApp,
        private repository: InventoryRepository,
    ) { }

    async execute(product: InventoryModel): Promise<any> {

        if(!this.repository.store(product))
            this.helper.alertMessage(Messenger.headerInventory, Messenger.notSaveData);
        
        return
    }
}