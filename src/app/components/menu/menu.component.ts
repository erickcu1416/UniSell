import { IUser } from './../../../utils/interfaces/modules/user.interface';
import { AuthService } from './../../../services/modules/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  user: IUser = {
    member: false,
    username: ''
  };

  constructor(private router: Router, private _authService: AuthService) { }

  async ngOnInit() {
    this.user = await this._authService.getUser();
    console.log('USER', this.user);
  }

  logOut() {
    this._authService.doLogout().then(
      data => {
        if (data) {
          this.router.navigateByUrl('login');
        }
      }
    );
  }
}
