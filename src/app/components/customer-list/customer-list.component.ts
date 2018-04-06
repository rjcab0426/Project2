import { Component, OnInit } from '@angular/core';

import { CustomerService } from '../../services/customer.service';
import { AuthService } from '../../services/auth.service';
import { Customer } from '../../datatypes/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];
  successMsg: string = '';
  errorMsg: string = '';
  username: string = '';

  constructor(
    private customer: CustomerService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.getAllCustomers();
    this.username = this.auth.getUsername();
  }

  getAllCustomers() {
    this.customer.getAllCustomers().subscribe((data) => {
      this.customers = data['customers'];      
    });    
  }

  removeCustomer(id) {
    this.customer.removeCustomer(id).subscribe((data) => {
      if(data['success'] === true) {
        this.successMsg = data['message'];
        // this.getAllCustomers(); // This looks okay. But it is an extra request to the server.
        
        // for(let index in this.customers) {
        //   if(this.customers[index]._id === id) {
        //     this.customers.splice(index, 1)
        //   }
        // }
        
        this.customers.forEach((customer, index) => {
          if(customer._id === id) {
            this.customers.splice(index, 1);
          }
        });

        setTimeout(() => this.successMsg = '', 3000);
      } else {
        this.errorMsg = data['message'];
        setTimeout(() => this.errorMsg = '', 3000);
      }
    }, (error) => {
        this.errorMsg = 'Something is wrong. We are trying to fix it. Please try again after some time.';
        setTimeout(() => this.errorMsg = '', 30000);
    });
  }
}
