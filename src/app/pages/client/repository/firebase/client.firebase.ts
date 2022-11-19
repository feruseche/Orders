import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegisterLogUsecase } from 'src/app/pages/log/application/register.log.usecase';
import { environment as env } from 'src/environments/environment';
import { ClientModel } from '../../model/client.model';
import { ClientRepository } from '../client.repository';

@Injectable({
    providedIn: 'root',
})
export class ClientFirebase extends ClientRepository
{
    private subject = new BehaviorSubject<ClientModel[]>([]); 
    observable$ = this.subject.asObservable();
    clientArray: ClientModel[] = [];
    resp: boolean = false;

    constructor(
        private http: HttpClient,
        private log: RegisterLogUsecase,
        ) {
        super()
    }

    getAll(): boolean {
        try {

            this.http.get('https://pedidos-35b02-default-rtdb.firebaseio.com/pedidos/clients.json')
            .subscribe(
                (resp: object) => {
                  this.clientArray = this.convertObjectToArray(resp)
                  this.subject.next(this.clientArray)
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

    getById(id: string): ClientModel {
        throw new Error('Method not implemented.');
    }

    store(data: ClientModel): boolean {
        throw new Error('Method not implemented.');
    }

    update(data: ClientModel): boolean {
        try{
            const URL: string = 'https://pedidos-35b02-default-rtdb.firebaseio.com/pedidos/clients/' + data.codigo +  '.json';
            this.http.put(URL, data).subscribe(
                (resp: any) => {
                    this.resp = true
                },
                (error: any) => {
                    this.resp = false
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

    import(data: ClientModel[]): boolean {
        throw new Error('Method not implemented.');
    }

    reset(): boolean {
        throw new Error('Method not implemented.');
    }

    private convertObjectToArray(obj: object): ClientModel[] {

        if (obj === null) {
          return [];
        }
    
        const array: ClientModel[] = [];
    
        Object.keys(obj).forEach((key) => {
          const model: ClientModel = obj[key];
          array.push(model);
        });
    
        return array;
      }

}