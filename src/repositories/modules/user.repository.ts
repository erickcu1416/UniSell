import { IUser } from './../../utils/interfaces/modules/user.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UserRepository {
    COLLECTION_END = 'users';

    private usersCollection: AngularFirestoreCollection<IUser>;
    private userDoc: AngularFirestoreDocument<IUser>;
    users: Observable<IUser[]>;
    user: Observable<IUser>;
    currentUser: IUser;

    constructor(private db: AngularFirestore) {
        console.log('Situation Repository Ready');
        this.usersCollection = this.db.collection<IUser>(`${this.COLLECTION_END}`);

    }

    async doUserFirestore(user: IUser): Promise<any> {
        return new Promise(
            async (resolve, reject) => {
            const id = this.db.createId();
            user._id = id;
            console.log('Crenaod desde repository', user);
            await this.usersCollection.doc(id).set(user).then(
                () => resolve(true),
                err => reject(err)
            );
        });
    }

    getUser(id): Observable<IUser> {
        this.userDoc = this.db.doc<IUser>(`${this.COLLECTION_END}/${id}`);
        this.user = this.userDoc.valueChanges();
        return this.user;
    }

    async updateUserFirestore(user: IUser): Promise<any> {
        return new Promise(
            async (resolve, reject) => {
            console.log('Crenaod desde repository', user);
            await this.usersCollection.doc(user._id.toString()).update(user).then(
                () => resolve(true),
                err => reject(err)
            );
        });
    }


    getCurrentsUsersByEmail(email): Promise<any> {
        console.log('email', email);
        return new Promise((resolve, reject) => {
            this.db.collection(`${this.COLLECTION_END}`, ref => ref.where('email', '==', `${email}`)).valueChanges().subscribe(
                data => {
                    if (data.length > 0) {
                        data.forEach(ele => {
                            this.currentUser = ele;
                            resolve(this.currentUser);
                        });
                    } else {
                        reject(false);
                    }
                }
            );
        });
    }

}
