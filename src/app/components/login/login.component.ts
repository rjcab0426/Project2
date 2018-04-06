import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading: boolean = false;
  returnUrl: string;
  error: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.auth.logout();
  }

  login() {
    this.loading = true;

    //call a service for login based on the response, navigate to the home page (customer listing) or 
    //stay here on login page and show the error.

    this.auth.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          //Success, then go to the home page
          //this.router.navigate([this.returnUrl]);          
          this.router.navigate(['/customers']);
        },
        error => {
          //Error, stay here and show the error
          //this.alertService.error(error.error) //idea for a global alert mechanism.
          this.error = 'Username and password not correct'
          this.loading = false;
        }
      )
    
  }

}
