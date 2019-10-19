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
  url2 = 'http://localhost:52447/api/rekognition';
  constructor(private http: HttpClient) { }

  recognizeFace(base64string:String) {    
    debugger;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(`${this.url2}`,[base64string]);
  }

  getUser(id) {
    return this.http.get(`${this.url}users.json?equalTo=${id}&orderBy="userId"`);
  }
}
