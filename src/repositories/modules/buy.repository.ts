import { IBuy } from '../../utils/interfaces/modules/buy.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class BuyRepository {
    private BuysCollection: AngularFirestoreCollection<IBuy>;
    Buys: Observable<IBuy[]>;

    private itemDoc: AngularFirestoreDocument<IBuy>;
    item: Observable<IBuy>;

    COLLECTION_END = 'products';
    SUBCOLLECTION_END = 'buys';



    constructor(private afs: AngularFirestore) {
        console.log('Buy Repository Ready');
        this.BuysCollection = this.afs.collection<IBuy>(`${this.COLLECTION_END}`);
    }

    getBuy(id): Observable<IBuy> {
        this.itemDoc = this.afs.doc<IBuy>(`${this.COLLECTION_END}/${id}`);
        this.item = this.itemDoc.valueChanges();
        return this.item;
    }

    getBuys(): Observable<IBuy[]> {
        this.Buys = this.BuysCollection.valueChanges();
        return this.Buys;
    }

    getBuysByIdProduct(idProduct): Observable<IBuy[]> {
        this.BuysCollection = this.afs.collection<IBuy>(`${this.COLLECTION_END}/${idProduct}/${this.SUBCOLLECTION_END}`);
        this.Buys = this.BuysCollection.valueChanges();
        return this.Buys;     
    }

    async updateBuy(Buy: IBuy): Promise<any> {
        return new Promise(
            async (resolve, reject) => {
            await this.itemDoc.update(Buy).then(
                () => resolve(true),
                err => reject(err)
            );
        });
    }

    async addBuy(Buy: IBuy): Promise<any> {
        return new Promise(
            async (resolve, reject) => {
            this.BuysCollection = this.afs.collection<IBuy>(`${this.COLLECTION_END}/${Buy.idProduct}/${this.SUBCOLLECTION_END}`);

            const id = this.afs.createId();
            Buy._id = id;
            await this.BuysCollection.doc(id).set(Buy).then(
                () => resolve(id),
                err => resolve(false),
            );
        });
    }
}
