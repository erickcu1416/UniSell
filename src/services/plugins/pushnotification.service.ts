import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { OneSignal, OSNotification } from '@ionic-native/onesignal/ngx';
import { IUserNotification } from 'src/utils/interfaces/plugins/usernotificaction.interface';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class PushNotificationService {

    constructor(private oneSignal: OneSignal,
                private platform: Platform,
                private router: Router) { }

    initOneSignal() {
        if (!this.platform.is('cordova')) {
            console.log('One singal no está disponible para Escritorio ');
            return;
        }

        this.oneSignal.startInit('1cc5d864-a2c6-4735-86aa-2cc219ee265d', '176388938866');

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

        this.oneSignal.handleNotificationReceived().subscribe(( noti) => {
        // do something when notification is received
            console.log('Notificación recibida', noti );
        });

        this.oneSignal.handleNotificationOpened().subscribe( async ( noti ) => {
        // do something when a notification is opened
            console.log('Notificación Abierta', noti );
            await this.notificationOpened(noti.notification);

        });

        this.oneSignal.endInit();
    }

    async notificationOpened(noti: OSNotification) {
        const payload = noti.payload;
        console.log('Información adicional recibida', payload);
        if (noti.payload.additionalData.navigation) {
            const id = noti.payload.additionalData.idPost;
            if (id !== null && id !== undefined && id !== '') {
                this.router.navigate([`/post/${id}`]);
            }
        }
    }

    async getIdNotiUser(): Promise<IUserNotification> {

        return new Promise(async (resolve, reject) => {
            let userNotification: IUserNotification;

            if (!this.platform.is('cordova')) {
                console.log('One singal no está disponible para Escritorio');
                userNotification = {
                    userId: '1111s',
                    pushToken: '111111',
                };
                return resolve(userNotification);
            }

            await this.oneSignal.getIds().then(
                data => {
                    userNotification = {
                        userId: data.userId,
                        pushToken: data.pushToken,
                    };
                    console.log(userNotification);
                    return resolve(userNotification);
                }
            );
        });

    }

}
