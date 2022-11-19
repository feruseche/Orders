import { HelperApp } from '../../../helpers/helper';
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { Injectable } from '@angular/core';
import { InventoryRepository } from '../repository/inventory.repository';
import { InventoryModel } from '../model/inventory.model';

@Injectable({
    providedIn: 'root',
})
export class SaveProductUsecase {

    constructor(
        private helper: HelperApp,
        private repository: InventoryRepository,
    ) { }

    async execute(products: InventoryModel[]): Promise<any> {

        if(!this.repository.import(products))
            this.helper.alertMessage(Messenger.headerInventory, Messenger.notSaveData);
        
        return
    }
}