import { AuthService } from './../../../services/modules/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private _authService: AuthService) { }

  ngOnInit() {}

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
