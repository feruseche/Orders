import { Injectable } from "@angular/core";
import { InventoryModel } from '../model/inventory.model';

@Injectable({
    providedIn: 'root',
})
export class CreateProductUsecase
{
    newProduct: InventoryModel;

    constructor() { }

    execute(): InventoryModel {

        this.newProduct = new InventoryModel();

        return this.newProduct;
    }
}
