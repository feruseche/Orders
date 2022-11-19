import { Injectable } from "@angular/core";
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { HelperApp } from '../../../helpers/helper';
import { OrderRepository } from '../repository/order.repository';

@Injectable({
    providedIn: 'root',
})
export class DeleteOrderUsecase
{
    constructor(
        private repository: OrderRepository,
        private helper: HelperApp,
        ) { }

    async execute(id: string): Promise<any> {

        if(!this.repository.delete(id)){
            await this.helper.alertMessage(Messenger.headerOrders, Messenger.notDeleteData);
        };

        return
    }
}