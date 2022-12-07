import { SettingInterface } from './setting.interface';

export class SettingModel implements SettingInterface
{
    Empresa: string;
    Rif: string;
    Tema: string;
    InicioDataCsvClientes: number;
    ColumnaCodigoClientes: number;
    ColumnaRifClientes: number;
    ColumnaNombreClientes: number;
    ColumnaCelularClientes: number;
    ColumnaDireccionClientes: number;
    InicioDataCsvInventario: number;
    ColumnaCodigoInventario: number;
    ColumnaNombreInventario: number;
    ColumnaUnidadInventario: number;
    ColumnaExistenciaInventario: number;
    ColumnaPrecio1Inventario: number;
    ColumnaPrecio2Inventario: number;
    ColumnaPrecio3Inventario: number;
    ImageId: number;
    CodigoVendedor: string;
    NombreVendedor: string;
    FotoVendedor: string;
}