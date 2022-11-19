export interface IClientCsv {
    codigo: string;
    rif: string;
    nombre: string;
    celular: string;
    direccion: string;
    foto: string;
}

export interface IClientLocal {
    codigo: string;
    pedidoAbierto: boolean;
    pedidoMonto: number;
    pedidoTotal: number;
    saldo: number;
    foto: string;
}

export interface IClientModel {
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