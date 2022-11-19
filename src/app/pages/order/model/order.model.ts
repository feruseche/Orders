import { OrderInterface, ProductOrderInterface } from './order.interface';

export class OrderModel implements OrderInterface
{
    codigo: string;
    rif: string;
    nombre: string;
    foto: string;
    total: number;
    fecha: Date;
    products: ProductOrderModel[];
}

export class ProductOrderModel implements ProductOrderInterface
{
    codigo: string;
    nombre: string;
    cantidad: number;
    precio: number;
    subtotal: number;
    foto: string;
}