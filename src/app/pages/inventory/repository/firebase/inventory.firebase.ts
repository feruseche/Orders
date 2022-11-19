import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RegisterLogUsecase } from 'src/app/pages/log/application/register.log.usecase';
import { InventoryModel } from '../../model/inventory.model';
import { InventoryRepositoryCloud } from '../inventory.repository.cloud';

@Injectable({
    providedIn: 'root',
})
export class InventoryFirebase extends InventoryRepositoryCloud
{
    private subject = new BehaviorSubject<InventoryModel[]>([]); 
    observable$ = this.subject.asObservable();
    productArray: InventoryModel[]=[];
    resp: boolean = false;

    constructor(
        private http: HttpClient,
        private log: RegisterLogUsecase,
        ) {
        super()
    }

    getAll(): boolean {
        try {

            this.http.get('https://pedidos-35b02-default-rtdb.firebaseio.com/pedidos/products.json')
            .subscribe(
                (resp: object) => {
                  this.productArray = this.convertObjectToArray(resp)
                  this.subject.next(this.productArray)
                  this.resp = true
                },
                (error: any) => {
                  this.resp = false
                }
              ); 
            return this.resp;
        } catch(error) {
            this.log.execute(this.constructor.name, this.getAll.name, error);
            return false;
        }
    }

    getById(id: string): InventoryModel {
        throw new Error('Method not implemented.');
    }
    store(data: InventoryModel): boolean {
        throw new Error('Method not implemented.');
    }

    update(data: InventoryModel): boolean {
        try{
            const URL: string = 'https://pedidos-35b02-default-rtdb.firebaseio.com/pedidos/products/' + data.codigo +  '.json';
            this.http.put(URL, data).subscribe(
                (resp: any) => {
                    this.resp = true;
                },
                (error: any) => {
                    console.log(<any>error);
                    this.resp = false;
                  } 
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
    import(data: InventoryModel[]): boolean {
        throw new Error('Method not implemented.');
    }
    reset(): boolean {
        throw new Error('Method not implemented.');
    }

    private convertObjectToArray(obj: object): InventoryModel[] {

        if (obj === null) {
          return [];
        }
    
        const array: InventoryModel[] = [];
    
        Object.keys(obj).forEach((key) => {
          const model: InventoryModel = obj[key];
          array.push(model);
        });
    
        return array;
      }

}