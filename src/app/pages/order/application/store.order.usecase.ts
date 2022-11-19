import { Injectable } from '@angular/core';
import { HelperApp } from '../../../helpers/helper';
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { OrderRepository } from '../repository/order.repository';
import { OrderModel } from '../model/order.model';

@Injectable({
    providedIn: 'root',
})
export class StoreOrderUsecase {

    constructor(
        private helper: HelperApp,
        private repository: OrderRepository,
    ) { }

    async execute(order: OrderModel): Promise<any> {

        if(!this.repository.store(order))
            this.helper.alertMessage(Messenger.headerOrders, Messenger.notSaveData);
        
        return
    }
}