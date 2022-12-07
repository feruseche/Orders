
export interface OrderInterface
{
    codigo: string;
    rif: string;
    nombre: string;
    foto: string;
    total: number;    
    fecha: Date;
    vendedorCodigo: string;
    products: ProductOrderInterface[];
}

export interface ProductOrderInterface
{
    codigo: string;
    nombre: string;
    cantidad: number;
    precio: number;
    subtotal: number;
    foto: string;
}