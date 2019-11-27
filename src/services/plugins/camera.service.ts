import { FirebaseStorageService } from 'src/services/modules/firebase-storage.service';
import { MessagesController } from './../../utils/messages/messages';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Injectable } from '@angular/core';
declare var window: any;

@Injectable({
    providedIn: 'root'
})

export class CameraService {

    tempImages: any [] = [];
    constructor(private camera: Camera, private _messagesController: MessagesController, private _storage: FirebaseStorageService) {
        // this.addTempImg('/assets/perro-1.jpg');
        // this.addTempImg('/assets/perro-1.jpg');
        // this.addTempImg('/assets/perro-1.jpg');
        // this.addTempImg('/assets/perro-1.jpg');

    }

    cameraOpt() {

        const options: CameraOptions = {
            quality: 60,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
        };

        this.camera.getPicture(options).then((imageData) => {
            const img = window.Ionic.WebView.convertFileSrc(imageData);
            console.log('webview', img);
            console.log('imageData', imageData);

            const data = imageData;
            console.log('base 64', data);
            // this._storage.subirBase64(data);

            const imgView = 'data:image/jpeg;base64,' + data;

            this.addTempImg(imgView, data);
        }, (err) => {

        });
    }

    selectPictures() {
        const options: CameraOptions = {
            quality: 60,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
          };

        this.camera.getPicture(options).then((imageData) => {
            const img = window.Ionic.WebView.convertFileSrc(imageData);
            const data = imageData;
            console.log('base 64', data);
            // this._storage.subirBase64(data);

            const imgView = 'data:image/jpeg;base64,' + data;

            this.addTempImg(imgView, data);
            console.log(img);
            }, (err) => {

        });
    }

    getTempImages() {
        return this.tempImages;
    }

    async addTempImg(img, base64) {
        console.log('Añadiendo imagen', img);
        const a = img = {
            img,
            base64,
        };

        this.tempImages.push(a);
        // let exist = false;
        // await this.tempImages.forEach(
        //     element => {
        //         if (element === img) {
        //             console.log('Son iguales', element);
        //             exist = true;
        //         }
        //     }
        // );
        // if (exist) {
        //     this._messagesController.presentAlertOk('', 'Esta imagen ya existe');
        // } else {
        // }
    }

    deleteTempImg(i) {
        const index = this.tempImages.indexOf(i);
        this.tempImages.splice(index, 1);
    }

    clearTempIms() {
        this.tempImages.length = 0;
    }


}
