import { Injectable } from "@angular/core";
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { HelperApp } from '../../../helpers/helper';
import { InventoryRepository } from '../repository/inventory.repository';

@Injectable({
    providedIn: 'root',
})
export class DeleteProductUsecase
{
    constructor(
        private repository: InventoryRepository,
        private helper: HelperApp,
        ) { }

    async execute(id: string): Promise<any> {

        if(!this.repository.delete(id))
            await this.helper.alertMessage(Messenger.headerInventory, Messenger.notDeleteData);

        return
    }
}