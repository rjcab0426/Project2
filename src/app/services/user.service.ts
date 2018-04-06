import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  private url: string = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  create(user) {
    return this.http.post(this.url + '/register', user);
  }
}
