import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {
  url = 'https://masrekognition.firebaseio.com/';
  url2 = 'http://cabegi1234-001-site1.dtempurl.com/api/rekognition';
  constructor(private http: HttpClient) { }

  recognizeFace(base64string: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(`${this.url2}`, [base64string]);
  }
}
