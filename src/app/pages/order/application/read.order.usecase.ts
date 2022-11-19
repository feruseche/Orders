import { Injectable } from "@angular/core";
import { Subscription } from 'rxjs';
import { HelperApp } from "src/app/helpers/helper";
import { MessengerService as Messenger } from '../../../helpers/messenger.service';
import { OrderModel } from "../model/order.model";
import { OrderRepository } from '../repository/order.repository';

@Injectable({
    providedIn: 'root',
})
export class ReadOrderUsecase
{
    subscription: Subscription;
    orderArray: OrderModel[];

    constructor(
        private repository: OrderRepository,
        private helper: HelperApp,
        ) { }

    execute(): OrderModel[] {

        if(!this.repository.getAll()){
            this.helper.alertMessage(Messenger.headerOrders, Messenger.notOrdersLoad);
            return
        };

        this.subscription = this.repository.observable$.subscribe(
                            (data: OrderModel[]) => {
                                this.orderArray = data
                            });

        this.subscription.unsubscribe();

        this.orderArray.sort(
            (firstObject: OrderModel, secondObject: OrderModel) =>
            firstObject.foto > secondObject.foto ? -1 : 1
          );

        return this.orderArray;
    }
}