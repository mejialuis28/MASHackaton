import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  public userData = {
      name : null,
      image : null,
      deals : []
  };
  constructor(public appService: AppService,
              private router: Router) { }

  ionViewWillEnter() {
    this.appService.getUser().subscribe((val: any) => {
        if (!val[1] || !val[1].name) {
            return this.router.navigate(['/']);
        }
        this.userData = val['1'];
    }, error => {});
  }

}
