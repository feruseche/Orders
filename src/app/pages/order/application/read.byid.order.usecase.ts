import { Injectable } from '@angular/core';
import { OrderModel, ProductOrderModel } from '../model/order.model';
import { OrderRepository } from '../repository/order.repository';

@Injectable({
    providedIn: 'root',
})
export class ReadByIdOrderUsecase
{

    constructor(private repository: OrderRepository) { }

    execute(id: string): OrderModel {

        let PRODUCT: OrderModel =  new OrderModel();

        PRODUCT = this.repository.getById(id);

        if(PRODUCT){
            PRODUCT.products.sort( 
                (firstObject: ProductOrderModel, secondObject: ProductOrderModel) =>
                firstObject.foto > secondObject.foto ? -1 : 1
              );
        }

        return PRODUCT;
    }
}