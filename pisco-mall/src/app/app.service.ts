import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    url = 'https://masrekognition.firebaseio.com/';
    private userId = null;
    constructor(private http: HttpClient) { }

    setUser(userId: string) {
        if (!userId) { return; }
        this.userId = userId;
    }

    getUser() {
        return this.http.get(`${this.url}users.json?equalTo=${this.userId}&orderBy="userId"`);
    }
}
