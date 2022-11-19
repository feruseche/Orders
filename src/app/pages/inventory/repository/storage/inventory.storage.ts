import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { environment as env } from '../../../../../environments/environment';
import { InventoryRepository } from '../inventory.repository';
import { InventoryModel } from '../../model/inventory.model';
import { RegisterLogUsecase } from '../../../log/application/register.log.usecase';

export class InventoryStorage extends InventoryRepository
{
  private subject = new BehaviorSubject<InventoryModel[]>([]);
  observable$ = this.subject.asObservable();
  log: RegisterLogUsecase;

  super() { }

  store(data: InventoryModel): boolean {
    try{
      const INVENTORY = JSON.parse(localStorage.getItem(env.ORDERINVENTORY)) || [] ;
      INVENTORY.push(data);
      localStorage.setItem(env.ORDERINVENTORY, JSON.stringify(INVENTORY));
      this.subject.next(INVENTORY);
      return true;
    } catch (error: any) {
      this.log.execute(this.constructor.name, this.store.name, error);
      return false;
    }
  }
  
  getAll(): boolean {
    try {
      const INVENTORY = JSON.parse(localStorage.getItem(env.ORDERINVENTORY)) || [] ;
      this.subject.next(INVENTORY);
      return true;
    } catch (error: any) {
      this.log.execute(this.constructor.name, this.getAll.name, error);
      return false;
    }
  }

  getById(id: string): InventoryModel {
    try{
      const INVENTORY = JSON.parse(localStorage.getItem(env.ORDERINVENTORY)) || [] ;
      const PRODUCT: InventoryModel = INVENTORY.find((p: InventoryModel) => p.codigo === id);
      return PRODUCT;
    } catch (error: any) {
      this.log.execute(this.constructor.name, this.getById.name, error);
    }
  }

  update(data: InventoryModel): boolean {
    try {
      const INVENTORY = JSON.parse(localStorage.getItem(env.ORDERINVENTORY)) || [] ;
      const PRODUCTS: InventoryModel[] = INVENTORY.filter((p: InventoryModel) => p.codigo !== data.codigo);
      PRODUCTS.push(data);
      localStorage.setItem(env.ORDERINVENTORY, JSON.stringify(PRODUCTS));
      this.subject.next(PRODUCTS);
      return true;
    } catch (error: any) {
      this.log.execute(this.constructor.name, this.update.name, error);
      return false;
    }
  }

  import(data: InventoryModel[]): boolean {
    try {
      localStorage.setItem(env.ORDERINVENTORY, JSON.stringify(data));
      this.subject.next(data);
      return true;
    } catch (error: any) {
      this.log.execute(this.constructor.name, this.import.name, error);
      return false;
    }
  }

  delete(id: string): boolean {
    try{
      const INVENTORY = JSON.parse(localStorage.getItem(env.ORDERINVENTORY)) || [] ;
      const PRODUCTS: InventoryModel[] = INVENTORY.filter((p: InventoryModel) => p.codigo !== id);
      localStorage.setItem(env.ORDERINVENTORY, JSON.stringify(PRODUCTS));
      this.subject.next(PRODUCTS);
      return true;
    } catch (error: any) {
      this.log.execute(this.constructor.name, this.delete.name, error);
      return false;
    }
  }

  reset(): boolean {
    try {
      localStorage.setItem(env.ORDERINVENTORY, JSON.stringify([]));
      this.subject.next([]);
      return true;
    } catch (error: any) {
      this.log.execute(this.constructor.name, this.import.name, error);
      return false;
    }
  }

}
