import { IUser } from './../../utils/interfaces/modules/user.interface';
import { AuthService } from './../../services/modules/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  user: IUser = {
    member: false,
    username: ''
  };

  constructor(private router: Router, private _authService: AuthService) {}

  navcart() {
    console.log('NavCar');
  }

  async ngOnInit() {
    this.user = await this._authService.getUser();
  }

  navigate() {
    this.router.navigateByUrl('tab3');
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
