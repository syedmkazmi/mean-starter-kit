import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {IUser} from "../interfaces/user";

import {HttpErrorResponse} from "@angular/common/http";

//TODO Fix signup component
@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // Creating a Form Model by creating a Form Group. signupForm is element of type 'FormGroup'
  signupForm: FormGroup;
  user: IUser[];

  constructor(private fb: FormBuilder, private _userService: UserService) {

  }

  ngOnInit() {

    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: '',
      password: ''
    });
  }

  signup() {
    //console.log(`signup clicked ${this.signupForm.value.fullName}`);
    this._userService.getUsers().subscribe(
      data => {
        this.user = data;
        console.log(data);
        console.log(data)
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error.message}`);
        }
    });
  }

}
