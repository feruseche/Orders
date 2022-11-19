import { BehaviorSubject, Observable } from 'rxjs';
import { environment as env } from '../../../../../environments/environment';
import { RegisterLogUsecase } from '../../../log/application/register.log.usecase';
import { ClientModel } from '../../model/client.model';
import { ClientRepository } from '../client.repository';

export class ClientStorage extends ClientRepository 
{
  private subject = new BehaviorSubject<ClientModel[]>([]); 
  observable$ = this.subject.asObservable();
  log: RegisterLogUsecase;
  
  super () { }

  store(data: ClientModel): boolean {
    try{
      const CLIENTS: ClientModel[] = JSON.parse(localStorage.getItem(env.ORDERCLIENT)) || [] ;
      CLIENTS.push(data);
      localStorage.setItem(env.ORDERCLIENT, JSON.stringify(CLIENTS));
      this.subject.next(CLIENTS);
      return true;
    }catch(error) {
      this.log.execute(this.constructor.name, this.store.name, error);
      return false;
    }
  }
  
  getAll(): boolean {
    try {
      const CLIENTS = JSON.parse(localStorage.getItem(env.ORDERCLIENT)) || [] ;
      this.subject.next(CLIENTS);
      return true;
    } catch (error) {
      this.log.execute(this.constructor.name, this.getAll.name, error);
      return false;
    }
  }

  getById(id: string): ClientModel {     
    try {
      const CLIENTS = JSON.parse(localStorage.getItem(env.ORDERCLIENT)) || [] ;
      const CLIENT: ClientModel = CLIENTS.find((p: ClientModel) => p.codigo === id);
      return CLIENT;
    }catch(error){
      this.log.execute(this.constructor.name, this.getById.name, error);
    }
  }

  update(data: ClientModel): boolean {
    try{
      const CLIENTS = JSON.parse(localStorage.getItem(env.ORDERCLIENT)) || [] ;
      const CLIENTUPDATE: ClientModel[] = CLIENTS.filter((p: ClientModel) => p.codigo !== data.codigo);
      CLIENTUPDATE.push(data);
      localStorage.setItem(env.ORDERCLIENT, JSON.stringify(CLIENTUPDATE));
      this.subject.next(CLIENTUPDATE);
      return true;
    }catch(error) {
      this.log.execute(this.constructor.name, this.update.name, error);
      return false;
    }
  }

  import(data: ClientModel[]): boolean {
    try {
      localStorage.setItem(env.ORDERCLIENT, JSON.stringify(data));
      this.subject.next(data);
      return true;
    } catch (error) {
      this.log.execute(this.constructor.name, this.import.name, error);
      return false;
    }
  }

  delete(id: string): boolean {
    try{
      const CLIENTS = JSON.parse(localStorage.getItem(env.ORDERCLIENT)) || [] ;
      const CLIENTUPDATE: ClientModel[] = CLIENTS.filter((p: ClientModel) => p.codigo !== id);
      localStorage.setItem(env.ORDERCLIENT, JSON.stringify(CLIENTUPDATE));
      this.subject.next(CLIENTUPDATE);
      return true;
    }catch(error) {
      this.log.execute(this.constructor.name, this.delete.name, error);
      return false;
    }
  }

  reset(): boolean {
    try {
      localStorage.setItem(env.ORDERCLIENT, JSON.stringify([]));
      this.subject.next([]);
      return true;
    } catch (error) {
      this.log.execute(this.constructor.name, this.reset.name, error);
      return false;
    }
  }
}
