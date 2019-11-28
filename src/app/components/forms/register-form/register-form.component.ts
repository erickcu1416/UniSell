import { NavController } from '@ionic/angular';
import { AuthService } from './../../../../services/modules/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MessagesController } from 'src/utils/messages/messages';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  @Output() loginChange = new EventEmitter();
  loginForm: FormGroup;
  // tslint:disable-next-line: variable-name
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
    ],
    confirmPassword: [
      { type: 'required', message: 'Es necesario este campo' },
      { type: 'mustMatch', message: 'Contraseñas diferentes' }
    ],
    username: [
      { type: 'required', message: 'Es necesario este campo' },
      { type: 'minLength', mesaage: 'El usuario no cumple con los caracteres' },
    ]
  };
  // tslint:disable-next-line:max-line-length
  constructor(public formBuilder: FormBuilder, private _authService: AuthService, private _messagesCtrl: MessagesController,
              private navCtrl: NavController, private router: Router) {
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
        )),
        username: new FormControl('', Validators.compose(
          [
            Validators.required,
            Validators.minLength(6),
          ]
        )),
        confirmPassword: new FormControl('', Validators.compose(
          [
            Validators.required,
          ]
        )),
      }, {
        // validator: MustMatch('password', 'confirmPassowrd'),
        validator: this.checkPasswords
      }
    );
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  async tryRegister(value) {
    console.log(value);
    this._messagesCtrl.presentLoading('Registrando...');
    setTimeout(() => {
    });
    let success = false;
    await this._authService.doRegister(value).then(
      (data) => {
        this._messagesCtrl.hideLoader();
        if (data === true) {
          this._messagesCtrl.presentAlertOkPromise('Usuario registrado con exito', 'Serás redireccionado al home').then(
            () => {
              this.navCtrl.navigateRoot('');
            }
          );
        } else {
          this._messagesCtrl.presentAlertOk('', 'Este correo ya ha sido registrado');
        }
      }
    ).catch(
      err => {
        this._messagesCtrl.hideLoader();
        this._messagesCtrl.presentAlertOk('Error', 'Ocurrió un error al registrarse');
      }
    );
  }

  ngOnInit() {
  }

  loginEmmiter() {
    this.router.navigateByUrl('login');
    this.loginChange.emit();
  }

}
