import { UserRepository } from './../../repositories/modules/user.repository';
import { Platform } from '@ionic/angular';
import { IUserNotification } from 'src/utils/interfaces/plugins/usernotificaction.interface';
import { PushNotificationService } from '../plugins/pushnotification.service';
import { IUser } from './../../utils/interfaces/modules/user.interface';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    user: Observable<IUser>;

  constructor(public afAuth: AngularFireAuth,
              private _userRepository: UserRepository,
              private _pushNotiService: PushNotificationService,
              private platform: Platform) {}

    getUserById(idUser): Observable<IUser> {
        return this._userRepository.getUser(idUser);
    }

    async doRegister(value) {
        return new Promise(async (resolve, reject) => {
        this.afAuth.auth
            .createUserWithEmailAndPassword(value.email, value.password)
            .then(
            async res => {
                const userPush: IUserNotification = await this._pushNotiService.getIdNotiUser();

                let user: IUser;
                if (!this.platform.is('cordova')) {
                    console.log('One singal no está disponible para Escritorio');
                    user = {
                        email: value.email,
                        username: value.username,
                    };
                } else {
                    user = {
                        email: value.email,
                        username: value.username,
                        userIdNoti: userPush.userId,
                        pushToken: userPush.pushToken,
                    };
                }

                console.log('user', user);
                await this._userRepository.doUserFirestore(user).then(
                    data => {
                        console.log('data auth', data);
                        resolve(true);
                    }
                ).catch(
                    err => reject(err)
                );
            },
            err => resolve(false)
            ).catch(
                err => reject(err)
            );
        });
    }

    doLogin(value) {
        return new Promise<any>((resolve, reject) => {
        this.afAuth.auth
            .signInWithEmailAndPassword(value.email, value.password)
            .then(
            async res => {
                console.log('Sucesss');
                if (!this.platform.is('cordova')) {
                    console.log('One singal no está disponible para Escritorio');
                    resolve(true);
                } else {
                    const us: any = await this.getUser();
                    const userPush: IUserNotification = await this._pushNotiService.getIdNotiUser();
                    const user: IUser = {
                        _id: us._id,
                        userIdNoti: userPush.userId,
                        pushToken: userPush.pushToken,
                    };
                    await this._userRepository.updateUserFirestore(user);
                    resolve(true);
                }
            },
            err => resolve(false)
            ).catch(
                err => reject(err)
            );
        });
    }

    doLogout(): Promise<any> {
        return new Promise((resolve, reject) => {
        if (firebase.auth().currentUser) {
            this.afAuth.auth.signOut();
            resolve(true);
        } else {
            resolve(false);
        }
        });
    }

    getCurrentUser() {
        return new Promise<any>((resolve, reject) => {
        const user = firebase.auth().onAuthStateChanged((us) => {
            if (us) {
                resolve(true);
            } else {
                reject(false);
            }
        });
        });
    }

    async getUser() {
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged(async (us) => {
                if (us) {
                    this._userRepository.getCurrentsUsersByEmail(us.email).then(
                        user => {
                            if (user) {
                                resolve(user);
                            } else {
                                resolve(false);
                            }
                        },
                        err => reject()
                    ).catch(
                        err => reject()
                    );
                }
            });
        });
    }

    updateCurrentUser(value) {
        return new Promise<any>((resolve, reject) => {
        const user = firebase.auth().currentUser;
        user
            .updateProfile({
            displayName: value.name,
            photoURL: user.photoURL
            })
            .then(
            res => {
                resolve(res);
            },
            err => reject(err)
            );
        });
    }

    updateUser(value: IUser) {
        return new Promise<any>((resolve, reject) => {
            const user = firebase.auth().currentUser;
            user
                .updateProfile({
                displayName: value.username
                })
                .then(
                res => {
                    resolve(res);
                },
                err => reject(err)
                );
        });
    }
}
