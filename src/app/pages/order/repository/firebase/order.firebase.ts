import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RegisterLogUsecase } from 'src/app/pages/log/application/register.log.usecase';
import { OrderModel, ProductOrderModel } from '../../model/order.model';
import { OrderRepositoryCloud } from '../order.repository.cloud';

@Injectable({
    providedIn: 'root',
})
export class OrderFirebase extends OrderRepositoryCloud
{
    orderArray: OrderModel[];
    resp: boolean = false;
    private subject = new BehaviorSubject<OrderModel[]>([]); 
    observable$ = this.subject.asObservable();

        constructor(
            private http: HttpClient,
            private log: RegisterLogUsecase,) {
            super();            
        }

    store(data: OrderModel): boolean {
        throw new Error('Method not implemented.');
    }
    
    getAll(): boolean {
        try {

            this.http.get('https://pedidos-35b02-default-rtdb.firebaseio.com/pedidos/orders.json')
            .subscribe(
                (resp: object) => {
                  this.orderArray = this.convertObjectToArray(resp)
                  this.subject.next(this.orderArray)
                  this.resp = true
                },
                (error: any) => {
                  console.log(<any>error)
                  this.resp = false
                }
              ); 
            return this.resp;
        } catch(error) {
            this.log.execute(this.constructor.name, this.getAll.name, error);
            return false;
        }
    }


    getById(id: string): OrderModel {
        throw new Error('Method not implemented.');
    }

    update(data: OrderModel): boolean {

        try{
            delete data.foto;
           
            const URL: string = 'https://pedidos-35b02-default-rtdb.firebaseio.com/pedidos/orders/' + data.codigo +  '.json';

            this.http.put(URL, data).subscribe(
                (resp: any) => { this.resp = true },
                (error: any) => { this.resp = false } 
            );
            return this.resp;
        }catch(error) {
            this.log.execute(this.constructor.name, this.update.name, error);
            return false;
        }
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

    private convertObjectToArray(obj: object): OrderModel[] {

        if (obj === null) {
          return [];
        }
    
        const array: OrderModel[] = [];
    
        Object.keys(obj).forEach((key) => {
          const model: OrderModel = obj[key];
          array.push(model);
        });
    
        return array;
      }

}