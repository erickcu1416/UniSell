import { IPicture } from './../../utils/interfaces/modules/post.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PicturesRepository {
    private PicturesCollection: AngularFirestoreCollection<IPicture>;
    Pictures: Observable<IPicture[]>;

    private itemDoc: AngularFirestoreDocument<IPicture>;
    item: Observable<IPicture>;

    COLLECTION_END = 'pictures';


    constructor(private afs: AngularFirestore) {
        console.log('Pictures Repository Ready');
        this.PicturesCollection = this.afs.collection<IPicture>(`${this.COLLECTION_END}`);
    }

    getPicture(id): Observable<IPicture> {
        this.itemDoc = this.afs.doc<IPicture>(`${this.COLLECTION_END}/${id}`);
        this.item = this.itemDoc.valueChanges();
        return this.item;
    }

    getPictures(): Observable<IPicture[]> {
        this.Pictures = this.PicturesCollection.valueChanges();
        return this.Pictures;
    }

    async updatePicture(Picture: IPicture): Promise<any> {
        return new Promise(
            async (resolve, reject) => {
            await this.itemDoc.update(Picture).then(
                () => resolve(true),
                err => reject(err)
            );
        });
    }

    async addPicture(Picture: IPicture): Promise<any> {
        return new Promise(
            async (resolve, reject) => {
            const id = this.afs.createId();
            Picture._id = id;
            await this.PicturesCollection.doc(id).set(Picture).then(
                () => resolve(id),
                err => resolve(false)
            ).catch(
                err => reject()
            );
        });
    }

    getPicturesByIdPost(id): Observable<IPicture[]> {
        this.Pictures = this.afs.collection(`${this.COLLECTION_END}`, ref => ref.where('idPost', '==', `${id}`)).valueChanges();
        return this.Pictures;
    }
}