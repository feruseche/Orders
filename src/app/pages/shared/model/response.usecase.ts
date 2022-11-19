import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class ResponseModelUsecase
{
    online: boolean;
    array: Array<any>;
    message?: string;
}