import { BuyRepository } from '../../repositories/modules/buy.repository';
import { AuthService } from './auth.service';
import { MessagesController } from 'src/utils/messages/messages';
import { IBuy } from './../../utils/interfaces/modules/Buy.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class BuyService {
    constructor(private _BuyRepository: BuyRepository,
                private _messagesCtrl: MessagesController,
                private _authService: AuthService) { }

    getBuys(): Observable<IBuy[]> {
        return this._BuyRepository.getBuys();
    }

    getBuysByType(type): Observable<IBuy[]> {
        return this._BuyRepository.getBuysByType(type);
    }

    getBuysByIdProduct(idProduct): Observable<IBuy[]> {
        return this._BuyRepository.getBuysByIdProduct(idProduct);
    }

    getBuyById(id): Observable<IBuy> {
        if (id === null || id === undefined || id === '' || id === 0) {
            this._messagesCtrl.presentAlertOk('', 'ID Invalido');
            return;
        }

        return this._BuyRepository.getBuy(id);
    }

    async addBuy(Buy: IBuy): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            this._messagesCtrl.presentLoading('Creando Buy...');

            const user: any = await this._authService.getUser();
            Buy.idUser = user._id;

            const res = await this._BuyRepository.addBuy(Buy);
            console.log('RES', res);

            if (!res) {
                await this._messagesCtrl.hideLoader().then(
                    res => {
                        this._messagesCtrl.presentAlertOkPromise('¡Ops!', 'Ocurrió un error al procesar la solicitud').then(
                            (r) => {
                            }
                        );
                    }
                );
            } else {
                this._messagesCtrl.hideLoader().then(
                    res => {
                        this._messagesCtrl.presentAlertOkPromise('', 'Buyo creado con exito').then(
                            (r) => {
                                if (r) {
                                    console.log('Respuesta', r);
                                    return resolve(true);
                                }
                            }
                        );
                    }
                );
            }

        });
    }
}
