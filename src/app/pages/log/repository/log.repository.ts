import { Observable } from "rxjs";
import { LogModel } from "../model/log.model";

export abstract class LogRepository {  
     
    abstract getObservable$(): Observable<LogModel[]>;
    abstract register(modulo: string, metodo: string , message: any): boolean; 
    abstract read(): boolean;
    abstract save(log: LogModel[]): boolean;

}
