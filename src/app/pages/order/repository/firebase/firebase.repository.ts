import { Observable } from 'rxjs';
import { OrderModel } from '../../model/order.model';
import { OrderRepository } from '../order.repository';

export class OrderFirebase extends OrderRepository
{
    observable$: Observable<OrderModel[]>;
    store(data: OrderModel): boolean {
        throw new Error('Method not implemented.');
    }
    getAll(): boolean {
        throw new Error('Method not implemented.');
    }
    getById(id: string): OrderModel {
        throw new Error('Method not implemented.');
    }
    update(data: OrderModel): boolean {
        throw new Error('Method not implemented.');
    }
    delete(id: string): boolean {
        throw new Error('Method not implemented.');
    }
    import(data: OrderModel[]): boolean {
        throw new Error('Method not implemented.');
    }
    reset(): boolean {
        throw new Error('Method not implemented.');
    }

}