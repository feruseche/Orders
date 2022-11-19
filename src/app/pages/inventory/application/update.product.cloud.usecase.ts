import { Injectable } from "@angular/core";
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { HelperApp } from '../../../helpers/helper';
import { InventoryModel } from '../model/inventory.model';
import { InventoryRepositoryCloud } from '../repository/inventory.repository.cloud';

@Injectable({
    providedIn: 'root',
})
export class UpdateProductCloudUsecase
{
    constructor(
        private repositoryCloud: InventoryRepositoryCloud,
        private helper: HelperApp,
        ) { }

    async execute(product: InventoryModel): Promise<any> {

        if(!this.repositoryCloud.update(product)){
            //await this.helper.alertMessage(Messenger.headerInventory, Messenger.notUpdateData);
            return
        }

    }
}