import { IClientCsv, IClientModel, IClientLocal } from './client.interface';

export class ClientModel implements IClientModel
{
    codigo: string;
    rif: string;
    nombre: string;
    celular: string;
    direccion: string;
    pedidoAbierto: boolean;
    pedidoMonto: number;
    pedidoTotal: number;
    saldo: number;
    foto: string;
}

export class ClientModelCsv implements IClientCsv
{
    codigo: string;
    rif: string;
    nombre: string;
    celular: string;
    direccion: string;   
    foto: string; 
}

export class ClientModelLocal implements IClientLocal
{
    codigo: string;
    pedidoAbierto: boolean;
    pedidoMonto: number;
    pedidoTotal: number;
    saldo: number;
    foto: string;    
}


