import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit, OnDestroy {
  sub: any;
  id: any;
  description = '';
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.id = params['id'] || '';
        console.log('DESCRIPCION', this.description);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  goToSelectPay() {
    this.router.navigate(['/select-pay'], { queryParams: { id: this.id, description: this.description } });
  }

}
