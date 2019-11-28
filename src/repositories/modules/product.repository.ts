import { IProduct } from '../../utils/interfaces/modules/product.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ProductRepository {
    private ProductsCollection: AngularFirestoreCollection<IProduct>;
    Products: Observable<IProduct[]>;

    private itemDoc: AngularFirestoreDocument<IProduct>;
    item: Observable<IProduct>;

    COLLECTION_END = 'products';


    constructor(private afs: AngularFirestore) {
        console.log('Product Repository Ready');
        this.ProductsCollection = this.afs.collection<IProduct>(`${this.COLLECTION_END}`);
    }

    getProduct(id): Observable<IProduct> {
        this.itemDoc = this.afs.doc<IProduct>(`${this.COLLECTION_END}/${id}`);
        this.item = this.itemDoc.valueChanges();
        return this.item;
    }

    getProducts(): Observable<IProduct[]> {
        this.Products = this.ProductsCollection.valueChanges();
        return this.Products;
    }

    getProductsByType(type): Observable<IProduct[]> {
        this.Products  = this.afs.collection<IProduct>(`${this.COLLECTION_END}`, ref => ref.where('type', '==', `${type}`))
            .valueChanges();
        return this.Products;
    }

    async updateProduct(Product: IProduct): Promise<any> {
        return new Promise(
            async (resolve, reject) => {
            await this.itemDoc.update(Product).then(
                () => resolve(true),
                err => reject(err)
            );
        });
    }

    async addProduct(Product: IProduct): Promise<any> {
        return new Promise(
            async (resolve, reject) => {
            const id = this.afs.createId();
            Product._id = id;
            await this.ProductsCollection.doc(id).set(Product).then(
                () => resolve(id),
                err => resolve(false),
            );
        });
    }
}
