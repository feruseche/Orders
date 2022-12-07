import { Observable } from "rxjs";
import { OrderModel } from '../model/order.model';

export abstract class OrderRepositoryCloud {   

    abstract observable$: Observable<OrderModel[]>;
    abstract store(data: OrderModel): boolean;
    abstract getAll(): boolean;
    abstract getById(id: string): OrderModel;
    abstract update(data: OrderModel): boolean;
    abstract delete(id: string): boolean;
    abstract import(data: OrderModel[]): boolean;
    abstract reset(): boolean;
}