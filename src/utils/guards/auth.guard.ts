import { NavController } from '@ionic/angular';
import { AuthService } from './../../services/modules/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  user = '';
  constructor(
    private navCtrl: NavController,
    private _authService: AuthService
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this._authService.getCurrentUser()
        .then(user => {
            console.log('USER', user);
            if (user) {
                return resolve(true);
            } else {
                this.navCtrl.navigateRoot('/login');
                return reject(false);
            }
        }, err => {
          console.log('Error en el guard');
          this.navCtrl.navigateRoot('/login');
          return reject(false);
        });
    });
  }
}
