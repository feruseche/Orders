import { Observable } from "rxjs";
import { InventoryModel } from "../model/inventory.model";

export abstract class InventoryRepository {   

    abstract observable$: Observable<InventoryModel[]>;
    abstract getAll(): boolean;
    abstract getById(id: string): InventoryModel;
    abstract store(data: InventoryModel): boolean;
    abstract update(data: InventoryModel): boolean;
    abstract delete(id: string): boolean;
    abstract import(data: InventoryModel[]): boolean;
    abstract reset(): boolean;
}