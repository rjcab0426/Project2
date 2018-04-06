import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CustomerService {

  private url: string = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) { }

  getAllCustomers() {
    return this.http.get(this.url);
  }

  removeCustomer(id) {
    return this.http.delete(this.url + '/' + id);
  }

}
