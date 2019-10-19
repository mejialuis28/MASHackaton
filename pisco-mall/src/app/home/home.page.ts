import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public products = null;
  constructor(public appService: AppService) { }

  ngOnInit() {
    this.appService.getUser().subscribe(val => {
        console.log('val');
        console.log(val);
        this.products = val;
        console.log('val');
    }, error => {});
  }

}
