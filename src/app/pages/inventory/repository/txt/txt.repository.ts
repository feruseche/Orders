import { Observable } from 'rxjs';
import { InventoryModel } from '../../model/inventory.model';
import { InventoryRepository } from '../inventory.repository';

export class InventoryTxt implements InventoryRepository
{
    observable$: Observable<InventoryModel[]>;
    getAll(): boolean {
        throw new Error('Method not implemented.');
    }
    getById(id: string): InventoryModel {
        throw new Error('Method not implemented.');
    }
    store(data: InventoryModel): boolean {
        throw new Error('Method not implemented.');
    }
    update(data: InventoryModel): boolean {
        throw new Error('Method not implemented.');
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

}