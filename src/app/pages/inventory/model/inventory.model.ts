import { InventoryInterface } from './inventory.interface';

export class InventoryModel implements InventoryInterface
{
    foto: string;
    codigo: string;
    nombre: string;
    unidad: string;
    existencia: number;
    precio1: number;
    precio2: number;
    precio3: number;
}