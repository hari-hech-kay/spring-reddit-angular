import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { LoginRequest } from './LoginRequest';
import { LoginResponse } from './LoginResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginRequest: LoginRequest;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  login() {
    this.loginRequest = this.loginForm.getRawValue();
    this.authService.login(this.loginRequest).subscribe(
      (response: LoginResponse) => {
        console.log(response);
        this.authService.saveUser(response);
        this.router.navigateByUrl('/', { replaceUrl: true });
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.toastr.error('Login Failed! Please try again');
      }
    );
  }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
}
