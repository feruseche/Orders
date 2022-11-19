import { Injectable } from '@angular/core';
import { InventoryModel } from '../model/inventory.model';
import { InventoryRepository } from '../repository/inventory.repository';

@Injectable({
    providedIn: 'root',
})
export class ReadByIdProductUsecase
{
    constructor(private repository: InventoryRepository) { }

    execute(id: string): InventoryModel {

        let PRODUCT: InventoryModel = new InventoryModel();

        PRODUCT = this.repository.getById(id);
        
        return PRODUCT;
    }
}