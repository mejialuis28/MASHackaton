import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WelcomeService {
    url = 'https://masrekognition.firebaseio.com/';
    constructor(private http: HttpClient) { }

    getUser(id) {
        return this.http.get(`${this.url}users.json?equalTo=${id}&orderBy="userId"`);
    }
}
