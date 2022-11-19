import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { environment as env } from '../../../../../environments/environment';
import { OrderRepository } from '../order.repository';
import { OrderModel, ProductOrderModel } from '../../model/order.model';
import { RegisterLogUsecase } from '../../../log/application/register.log.usecase';

export class OrderStorage extends OrderRepository 
{
  private subject = new BehaviorSubject<any>([]);
  observable$ = this.subject.asObservable();
  log: RegisterLogUsecase;

  super() { }

  store(data: OrderModel): boolean {
    try{
      const ORDERS: OrderModel[] = JSON.parse(localStorage.getItem(env.ORDERSPED)) || [] ;
      ORDERS.push(data);
      localStorage.setItem(env.ORDERSPED, JSON.stringify(ORDERS));
      this.subject.next(ORDERS);
      return true;
    }catch(error){
      this.log.execute(this.constructor.name, this.store.name, error);
      return false;
    }
  }

  getAll(): boolean {
    try {
      const ORDERS = JSON.parse(localStorage.getItem(env.ORDERSPED)) || [] ;
      this.subject.next(ORDERS);
      return true;
    } catch (error) {
      this.log.execute(this.constructor.name, this.getAll.name, error);
      return false;
    }
  }

  getById(id: string): OrderModel {
    try{
      const ORDERS: OrderModel[] = JSON.parse(localStorage.getItem(env.ORDERSPED)) || [] ;
      const ORDER: OrderModel = ORDERS.find((o: OrderModel) => o.codigo === id);
      return ORDER;
    }catch(error){
      this.log.execute(this.constructor.name, this.getById.name, error);
    }
  }

  update(data: OrderModel): boolean {
    try{
      const ORDERS: OrderModel[] = JSON.parse(localStorage.getItem(env.ORDERSPED)) || [] ;
      const ORDERUPDATE: OrderModel[] = ORDERS.filter((o: OrderModel) => o.codigo !== data.codigo);
      ORDERUPDATE.push(data);
      localStorage.setItem(env.ORDERSPED, JSON.stringify(ORDERUPDATE));
      this.subject.next(ORDERUPDATE);
      return true;
    }catch(error){
      this.log.execute(this.constructor.name, this.update.name, error);
      return false;
    }
  }

  import(data: OrderModel[]): boolean {
    try {
      localStorage.setItem(env.ORDERSPED, JSON.stringify(data));
      this.subject.next(data);
      return true;
    } catch (error) {
      this.log.execute(this.constructor.name, this.import.name, error);
      return false;
    }
  }

  delete(id: string): boolean {
    try{
      const ORDERS: OrderModel[] = JSON.parse(localStorage.getItem(env.ORDERSPED)) || [];
      const ORDERDELETE: OrderModel[] = ORDERS.filter((o: OrderModel) => o.codigo !== id);
      localStorage.setItem(env.ORDERSPED, JSON.stringify(ORDERDELETE));
      this.subject.next(ORDERDELETE);
      return true;
    }catch(error){
      this.log.execute(this.constructor.name, this.delete.name, error);
      return false;
    }
  }

  reset(): boolean {
    try {
      localStorage.setItem(env.ORDERSPED, JSON.stringify([]));
      this.subject.next([]);
      return true;
    } catch (error) {
      this.log.execute(this.constructor.name, this.reset.name, error);
      return false;
    }
  }
}
