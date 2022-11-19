import { Observable } from "rxjs";
import { SettingModel } from "../model/setting.model";

export abstract class SettingRepository {   

    abstract getObservable$(): Observable<SettingModel[]>;
    abstract read(): boolean;
    abstract save(data: SettingModel[]): boolean;

}