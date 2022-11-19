import { Observable } from 'rxjs';
import { SettingModel } from '../../model/setting.model';
import { SettingRepository } from '../setting.repository';

export class SettingFirebase extends SettingRepository
{
    getObservable$(): Observable<SettingModel[]> {
        throw new Error('Method not implemented.');
    }
    read(): boolean {
        throw new Error('Method not implemented.');
    }
    save(data: any[]): boolean {
        throw new Error('Method not implemented.');
    }

}