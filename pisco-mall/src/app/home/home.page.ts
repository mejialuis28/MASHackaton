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
        const keys = Object.keys(val);
        if (!keys.length) {return this.router.navigate(['/']); }
        this.userData = val[keys[0]];
    }, error => {});
  }

}
