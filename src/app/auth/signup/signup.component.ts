import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { SignupRequest } from './signup.request';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  singupRequest: SignupRequest;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  signup() {
    this.singupRequest = this.signupForm.getRawValue();
    console.log(this.singupRequest);
    this.authService.signup(this.singupRequest).subscribe(
      (response) => {
        console.log(response);
        this.toastr.success(
          'Signed up successfully. Please check your mail to activate your account'
        );
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.toastr.error('Signup Failed! Please try again');
      }
    );
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
}
