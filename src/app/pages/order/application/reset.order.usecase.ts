import { Injectable } from "@angular/core";
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { HelperApp } from '../../../helpers/helper';
import { OrderRepository } from '../repository/order.repository';

@Injectable({
    providedIn: 'root',
})
export class ResetOrderUsecase
{
    constructor(
        private repository: OrderRepository,
        private helper: HelperApp,
        ) { }

    async execute(): Promise<any> {

        if(!this.repository.reset())
            await this.helper.alertMessage(Messenger.headerOrders, Messenger.notDeleteData);

        return
    }
}