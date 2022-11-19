import { Injectable } from "@angular/core";
import { ClientModel } from "../model/client.model";

@Injectable({
    providedIn: 'root',
})
export class CreateClientUsecase
{
    newClient: ClientModel;

    constructor() { }

    execute(): ClientModel {
        
        this.newClient = new ClientModel();

        return this.newClient;
    }
}
