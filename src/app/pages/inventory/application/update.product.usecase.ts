import { Injectable } from "@angular/core";
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { HelperApp } from '../../../helpers/helper';
import { InventoryRepository } from '../repository/inventory.repository';
import { InventoryModel } from '../model/inventory.model';

@Injectable({
    providedIn: 'root',
})
export class UpdateProductUsecase
{
    constructor(
        private repository: InventoryRepository,
        private helper: HelperApp,
        ) { }

    async execute(product: InventoryModel): Promise<any> {

        if(!this.repository.update(product))
            await this.helper.alertMessage(Messenger.headerInventory, Messenger.notUpdateData);

        return
    }
}