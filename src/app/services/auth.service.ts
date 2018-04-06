import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  private url: string = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    let data = {
      username: username,
      password: password
    };

    return this.http.post<any>(this.url + '/login', data)
      .map(user => {
        if(user && user.token) {
          localStorage.setItem('user', JSON.stringify(user))
        }
      })
  }

  logout() {
    localStorage.removeItem('user');
  }

  getUsername() {
    let user = JSON.parse(localStorage.getItem('user'));
    return user.username;
  }

}
