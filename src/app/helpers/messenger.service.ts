import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class MessengerService 
{
    static cameraHeader: string = 'CÁMARA';
    static headerOrders: string    = 'PEDIDOS';
    static headerClients: string   = 'CLIENTES';
    static headerInventory: string = 'PRODUCTOS';
    static headerSetting: string   = 'AJUSTES';
    static headerLog: string = 'LOGS';

    static dataDownloadedOk: string = '¡Datos descargados correctamente!';

    static notSettingsLoad: string = '¡No se pudo cargar la configuración!';
    static notClientsLoad: string  = '¡No se pudo cargar los clientes!';
    static notClientsCloud: string  = '¡Error al descargar los clientes!';
    static notProductsLoad: string = '¡No se pudo cargar los productos!';
    static notProductsCloud: string  = '¡Error al descargar los productos!';
    static notOrdersLoad: string   = '¡No se pudo cargar los pedidos!';
    static notLogsLoad: string   = '¡No se pudo cargar los logs!';

    static invalidFileType: string = '¡Por favor importe un archivo válido!';
    static errorReadFile: string   = '¡Error durante la lectura del archivo!';
    
    static notSaveData: string   = '¡No se pudo guardar!';
    static notUpdateData: string   = '¡No se pudo actualizar!';
    static notDeleteData: string = '¡No se pudo eliminar!';

    static confirmDelete: string = '¿Confirma eliminar?';
    static confirmReset: string = '¿Confirma eliminar todos los registros?';
    static confirmDeleteOrder: string = '¿Confirma eliminar este pedido?';
    
    static chargingData: string  = 'Cargando...';
    static downloadingData: string  = 'Descargando...';
    static uploadingData: string  = 'Subiendo los datos...';
    static importingData: string = 'Importando...';
    static savingData: string    = 'Guardando...';
    static updatingData: string    = 'Actualizando...';
    static syncData: string    = 'Sincronizando...';
    static deletingData: string  = 'Eliminando...';

    static pathApp: string         = 'PEDIDOSAPP';
    static pathClientsImg: string  = '/PEDIDOSAPP/IMG/CLIENTS/';
    static pathProductsImg: string = '/PEDIDOSAPP/IMG/PRODUCTS/';
    static pathClientsDB: string   = '/PEDIDOSAPP/DB/';
    static pathProductsDB: string  = '/PEDIDOSAPP/DB/';
    
    static notGetImage: string = '¡No se pudo obtener la imágen!';
    
    static inProcess: string = 'Módulo en desarrollo';

}