import { MessagesController } from './../../../../utils/messages/messages';
import { Router } from '@angular/router';
import { AuthService } from './../../../../services/modules/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

  @Output() registerChange = new EventEmitter();

  loginForm: FormGroup;
  error_messages = {
    email: [
      { type: 'required', message: 'El correo es necesario' },
      { type: 'minLength', mesaage: 'El correo no cumple con los caracteres' },
      { type: 'maxLength', message: 'El correo tiene muchos caracteres' },
      { type: 'pattern', message: 'Ingresa un correo valido' },
    ],
    password: [
      { type: 'required', message: 'La contraseña es necesaria' },
      { type: 'minLength', mesaage: 'La contraseña tiene bajos caracteres' },
      { type: 'maxLength', message: 'La contraseña a pasado el limite de los caracteres' },
      { type: 'pattern', message: 'Ingresa una contraseña valida' },
    ]
  };
  constructor(public formBuilder: FormBuilder, private _authService: AuthService, private navCtrl: NavController,
              private _messagesCtrl: MessagesController
              ) {
    this.loginForm = this.formBuilder.group(
      {
        password: new FormControl('', Validators.compose(
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
          ]
        )),
        email: new FormControl('', Validators.compose(
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),
          ]
        ))
      }
    );
  }

  async tryLogin(value) {
    console.log(value);
    this._messagesCtrl.presentLoading('Procesando...');
    await this._authService.doLogin(value).then(
      async res => {
        await this._messagesCtrl.hideLoader();
        if (res === true) {
          this.navCtrl.navigateRoot('');
        } else {
          this._messagesCtrl.presentAlertOk('', 'Usuario y/o contraseña invalidos');
        }
      }
    ).catch(
      err => {
        this._messagesCtrl.hideLoader();
        this._messagesCtrl.presentAlertOk('', 'Error al intentar conectar');
      }
    );
  }

  ngOnInit(): void {
  }

  registerEmitter() {
    this.registerChange.emit();
  }

}
