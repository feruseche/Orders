import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { environment as env } from '../../../../../environments/environment';
import { LogModel } from '../../model/log.model';
import { LogRepository } from '../log.repository';

@Injectable({
  providedIn: 'root',
})
export class LogStorage extends LogRepository
{
  private LogSubject = new BehaviorSubject<LogModel[]>(null);
  public LogObservable$ = this.LogSubject.asObservable(); 
  logArray: LogModel[]=[];
  logSubscription$: Subscription;

  super() { 
    console.log(this.logArray)
    if(this.read()){
      this.logSubscription$ = this.LogObservable$.subscribe(
        (logs: LogModel[]) => this.logArray = logs
      );
      if(this.logArray.length===0){
        this.save([]);
      }
    }
  }

  getObservable$(): Observable<LogModel[]> {
    return
  }

  register(modulo: string, metodo: string , message: any): boolean {
    const logId: number = (this.logArray.length===0) ? 1 : this.logArray.length + 1;
    const logDate: any = new Date();
    const log: LogModel = new LogModel();
    log.id = logId;
    log.date = logDate.toString();
    log.modulo = modulo;
    log.metodo = metodo;
    log.message = message.toString();
    this.logArray.push(log);
    this.save(this.logArray);
    return true;
  }

  read(): boolean {
    try {
      const LOGS: LogModel[] = JSON.parse(localStorage.getItem(env.ORDERLOG)) || [];
      this.LogSubject.next(LOGS);
      return true;
    } catch (error) {
      this.register(this.constructor.name, this.read.name, error);
      return false;
    }
  }

  save(log: LogModel[]): boolean {
    try {
      localStorage.setItem(env.ORDERLOG, JSON.stringify(log));
      this.LogSubject.next(log);
      return true;
    } catch (error) {
      this.register(this.constructor.name, this.save.name, error);
      return false;
    }
  }
}
