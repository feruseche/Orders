import { BehaviorSubject, Observable } from 'rxjs';
import { environment as env } from '../../../../../environments/environment';
import { SettingModel } from '../../model/setting.model';
import { SettingInit } from '../../model/setting.init';
import { SettingRepository } from '../setting.repository';
import { RegisterLogUsecase } from '../../../log/application/register.log.usecase';

export class SettingStorage extends SettingRepository
{
  private SettingSubject = new BehaviorSubject<SettingModel[]>(null);
  public SettingObservable$ = this.SettingSubject.asObservable(); 
  private log: RegisterLogUsecase;

  super() { }

  getObservable$(): Observable<SettingModel[]> {
      return this.SettingObservable$;
  }

  read(): boolean {
    try {
      const SETTINGS: SettingModel[] = JSON.parse(localStorage.getItem(env.ORDERCONFIG)) || new SettingInit();
      this.SettingSubject.next(SETTINGS);
      return true;
    } catch (error) {
      this.log.execute(this.constructor.name, this.read.name, error);
      return false;
    }
  }

  save(data: SettingModel[]): boolean {
    try {
      localStorage.setItem(env.ORDERCONFIG, JSON.stringify(data));
      this.SettingSubject.next(data);
      return true;
    } catch (error) {
      this.log.execute(this.constructor.name, this.save.name, error);
      return false;
    }
  }
}
