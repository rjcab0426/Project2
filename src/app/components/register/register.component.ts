import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  loading: boolean = false;
  errorMsg: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register() {
    this.loading = true;

    //call the user service to create a new user.
    this.userService.create(this.model)
      .subscribe(
        data => {
          this.router.navigate(['/login'])
        },
        error => {
          //Show Error on this page.
          this.errorMsg = 'Something went wrong.';
          this.loading = false;
        }
      );
  }

}
