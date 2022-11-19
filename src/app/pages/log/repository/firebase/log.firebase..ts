import { LogModel } from '../../model/log.model';
import { InterfaceRepository } from '../log.repository';

export class LogFirebase implements InterfaceRepository
{
    register(module: string, message: string): boolean {
        throw new Error('Method not implemented.');
    }
    read(): boolean {
        throw new Error('Method not implemented.');
    }
    save(data: LogModel[]): boolean {
        throw new Error('Method not implemented.');
    }
    
}