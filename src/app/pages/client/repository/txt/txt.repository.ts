import { Observable } from "rxjs";
import { ClientModel } from "../../model/client.model";
import { ClientRepository } from "../client.repository";


export class ClientTxt extends ClientRepository
{
    observable$: Observable<ClientModel[]>;
    getAll(): boolean {
        throw new Error("Method not implemented.");
    }
    getById(id: string): ClientModel {
        throw new Error("Method not implemented.");
    }
    store(data: ClientModel): boolean {
        throw new Error("Method not implemented.");
    }
    update(data: ClientModel): boolean {
        throw new Error("Method not implemented.");
    }
    delete(id: string): boolean {
        throw new Error("Method not implemented.");
    }
    import(data: ClientModel[]): boolean {
        throw new Error("Method not implemented.");
    }
    reset(): boolean {
        throw new Error("Method not implemented.");
    }
    
}