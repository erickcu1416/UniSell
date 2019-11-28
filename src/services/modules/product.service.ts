import { AuthService } from './auth.service';
import { MessagesController } from 'src/utils/messages/messages';
import { IProduct } from './../../utils/interfaces/modules/product.interface';
import { ProductRepository } from './../../repositories/modules/product.repository';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    constructor(private _productRepository: ProductRepository,
                private _messagesCtrl: MessagesController,
                private _authService: AuthService) { }

    getProducts(): Observable<IProduct[]> {
        return this._productRepository.getProducts();
    }

    getProductsByType(type): Observable<IProduct[]> {
        return this._productRepository.getProductsByType(type);
    }

    getProductById(id): Observable<IProduct> {
        if (id === null || id === undefined || id === '' || id === 0) {
            this._messagesCtrl.presentAlertOk('', 'ID Invalido');
            return;
        }

        return this._productRepository.getProduct(id);
    }

    async addProduct(product: IProduct): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            this._messagesCtrl.presentLoading('Creando producto...');

            const user: any = await this._authService.getUser();
            product.idUser = user._id;

            const res = await this._productRepository.addProduct(product);
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
                        this._messagesCtrl.presentAlertOkPromise('', 'Producto creado con exito').then(
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
