import { Injectable } from "@angular/core";
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { HelperApp } from '../../../helpers/helper';
import { InventoryRepository } from '../repository/inventory.repository';

@Injectable({
    providedIn: 'root',
})
export class ResetProductUsecase
{
    constructor(
        private repository: InventoryRepository,
        private helper: HelperApp,
        ) { }

    async execute(): Promise<any> {

        if(!this.repository.import([]))
            await this.helper.alertMessage(Messenger.headerInventory, Messenger.notDeleteData);
        
        return
    }
}