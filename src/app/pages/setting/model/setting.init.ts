import { SettingInterface } from './setting.interface';
import { File } from '@ionic-native/file/ngx';

export class SettingInit implements SettingInterface
{
    Empresa: string = 'DEMO';
    Rif: string = '1234567890';
    Tema: 'light';
    InicioDataCsvClientes: number = 0;
    ColumnaCodigoClientes: number = 0;
    ColumnaRifClientes: number = 0;
    ColumnaNombreClientes: number = 0;
    ColumnaCelularClientes: number = 0;
    ColumnaDireccionClientes: number = 0;
    InicioDataCsvInventario: number = 0;
    ColumnaCodigoInventario: number = 0;
    ColumnaNombreInventario: number = 0;
    ColumnaUnidadInventario: number = 0;
    ColumnaExistenciaInventario: number = 0;
    ColumnaPrecio1Inventario: number = 0;
    ColumnaPrecio2Inventario: number = 0;
    ColumnaPrecio3Inventario: number = 0;
    ImageId: number = 1000000;
    CodigoVendedor: '001';
    NombreVendedor: 'Vendedor DEMO 001';
    FotoVendedor: '';

    constructor() 
    {
        this.initSetting();
    }

    async initSetting() {
        const file: File = new File();
        await file.createDir(file.externalApplicationStorageDirectory, 'PEDIDOSAPP', false).catch(err => err);
        await file.createDir(file.externalApplicationStorageDirectory+'/PEDIDOSAPP', 'IMG', false).catch(err => err);
        await file.createDir(file.externalApplicationStorageDirectory+'/PEDIDOSAPP/IMG', 'CLIENTS', false).catch(err => err);
        await file.createDir(file.externalApplicationStorageDirectory+'/PEDIDOSAPP/IMG', 'PRODUCTS', false).catch(err => err);
        await file.createDir(file.externalApplicationStorageDirectory+'/PEDIDOSAPP', 'DB', false).catch(err => err);
        await file.createFile(file.externalApplicationStorageDirectory+'/PEDIDOSAPP/DB', 'settings.csv', false).catch(err => err);
        await file.createFile(file.externalApplicationStorageDirectory+'/PEDIDOSAPP/DB', 'clients.csv', false).catch(err => err);
        await file.createFile(file.externalApplicationStorageDirectory+'/PEDIDOSAPP/DB', 'inventory.csv', false).catch(err => err);
        await file.createFile(file.externalApplicationStorageDirectory+'/PEDIDOSAPP/DB', 'orders.csv', false).catch(err => err);
        await file.createFile(file.externalApplicationStorageDirectory+'/PEDIDOSAPP/DB', 'pedido.csv', false).catch(err => err);
        await file.createFile(file.externalApplicationStorageDirectory+'/PEDIDOSAPP/DB', 'fotos.csv', false).catch(err => err);
    }
}
