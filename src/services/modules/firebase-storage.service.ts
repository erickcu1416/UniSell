import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { PicturesRepository } from 'src/repositories/modules/pictures.repository';


@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  downloadURL: Observable<string>;
  constructor(
    private storage: AngularFireStorage,
  ) { }

  // Tarea para subir archivo
  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    console.log('imagen', datos);
    return this.storage.upload(nombreArchivo, datos);
  }

  // Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }

  subirBase64(img): Promise<any> {
    return new Promise((resolve, reject) => {
      const message = img;
      const nombreArchivo: string = new Date().valueOf().toString();
      const referencia = this.storage.ref(`img/${ nombreArchivo }`);
      const uploadTask: AngularFireUploadTask =
      this.storage.ref(`img/${ nombreArchivo }`).putString(message, 'base64', {contentType: 'image/jpeg'});
      // tslint:disable-next-line: variable-name
      let URLPublica = '';
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = referencia.getDownloadURL();
          this.downloadURL.subscribe(url => {
            URLPublica = url;
            console.log('url', URLPublica);
            resolve(URLPublica);
          });
        })
      ).subscribe();

      uploadTask.percentageChanges().subscribe((porcentaje) => {
        porcentaje = Math.round(porcentaje);
        console.log(porcentaje);
        if (porcentaje === 100) {
          console.log('porcentaje listo');
        }
      });
    });

  }
}
