import { Injectable } from "@angular/core";
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { HelperApp } from '../../../helpers/helper';
import { OrderRepositoryCloud } from "../repository/order.repository.cloud";
import { OrderModel } from "../model/order.model";

@Injectable({
    providedIn: 'root',
})
export class UpdateOrderCloudUsecase
{
    constructor(
        private repositoryCloud: OrderRepositoryCloud,
        private helper: HelperApp,
        ) { }

    async execute(order: OrderModel): Promise<any> {

        if(!this.repositoryCloud.update(order))
            await this.helper.alertMessage(Messenger.headerOrders, Messenger.notUpdateData);

        return
    }
}