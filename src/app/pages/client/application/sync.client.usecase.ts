import { Injectable } from '@angular/core';
import { ClientModel, ClientModelCsv } from '../model/client.model';

@Injectable({
    providedIn: 'root',
})
export class SyncClientUsecase
{
    arraySync: ClientModel[]=[];

    constructor() { }

    async execute(arrayImported: ClientModel[], arrayClients: ClientModel[]): Promise<any> {
        
        this.arraySync = arrayClients;
        for(let i=0; i<arrayImported.length; i++){

            let clientImported: ClientModel = arrayImported[i];
            
            let index = this.arraySync.findIndex((clientDB) => clientDB.codigo.trim() == clientImported.codigo.trim());
            if(index >= 0){
                this.arraySync[index]['rif'] = clientImported.rif;
                this.arraySync[index]['nombre'] = clientImported.nombre;
                this.arraySync[index]['direccion'] = clientImported.direccion;
                this.arraySync[index]['celular'] = clientImported.celular;
            }else{
                console.log(arrayImported['codigo']);
                let clientSync: ClientModel = new ClientModel()
                clientSync.codigo = clientImported.codigo;
                clientSync.rif = clientImported.rif;
                clientSync.nombre = clientImported.nombre;
                clientSync.direccion = clientImported.direccion;
                clientSync.celular = clientImported.celular;
                clientSync.pedidoAbierto = false;
                clientSync.pedidoMonto = 0;
                clientSync.pedidoTotal = 0;
                clientSync.saldo = 0;
                clientSync.foto = '';
                this.arraySync.push(clientSync);
            }
        }

        // const x = arrayImported.forEach(
        //     (clientImported: ClientModelCsv) => {
        //     const index: number = this.arraySync.findIndex(
        //         (clientDB) => clientDB.codigo.trim() == clientImported.codigo.trim());
        //     if(index >= 0){
        //         this.arraySync[index]['rif'] = clientImported.rif;
        //         this.arraySync[index]['nombre'] = clientImported.nombre;
        //         this.arraySync[index]['direccion'] = clientImported.direccion;
        //         this.arraySync[index]['celular'] = clientImported.celular;
        //     }else{
        //         console.log(arrayImported['codigo']);
        //         let clientSync: ClientModel = new ClientModel()
        //         clientSync.codigo = clientImported.codigo;
        //         clientSync.rif = clientImported.rif;
        //         clientSync.nombre = clientImported.nombre;
        //         clientSync.direccion = clientImported.direccion;
        //         clientSync.celular = clientImported.celular;
        //         clientSync.pedidoAbierto = false;
        //         clientSync.pedidoMonto = 0;
        //         clientSync.pedidoTotal = 0;
        //         clientSync.saldo = 0;
        //         clientSync.foto = '';
        //         this.arraySync.push(clientSync);
        //     }
        // });

        // arraySync.sort(
        //     (firstObject: ClientModel, secondObject: ClientModel) =>
        //     firstObject.nombre > secondObject.nombre ? 1 : -1
        //   );
        console.log(this.arraySync);
        return this.arraySync;
    }
}