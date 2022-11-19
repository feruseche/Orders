import { Observable } from "rxjs";
import { ClientModel } from "../model/client.model";

export abstract class ClientRepositoryCloud {   

    abstract observable$: Observable<ClientModel[]>;
    abstract getAll(): boolean;
    abstract getById(id: string): ClientModel;
    abstract store(data: ClientModel): boolean;
    abstract update(data: ClientModel): boolean;
    abstract delete(id: string): boolean;
    abstract import(data: ClientModel[]): boolean;
    abstract reset(): boolean;

}