import { LogInterface } from "./log.interface";

export class LogModel implements LogInterface
{
    id: number;
    modulo: string;
    metodo: string;
    date: string;
    message: string;    
}