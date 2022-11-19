import { Injectable } from "@angular/core";
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { HelperApp } from '../../../helpers/helper';
import { OrderRepository } from '../repository/order.repository';
import { OrderModel } from '../model/order.model';


@Injectable({
    providedIn: 'root',
})
export class UpdateOrderUsecase
{
    constructor(
        private repository: OrderRepository,
        private helper: HelperApp,
        ) { }

    async execute(order: OrderModel): Promise<any> {

        if(!this.repository.update(order))
            await this.helper.alertMessage(Messenger.headerOrders, Messenger.notUpdateData);

        return
    }
}