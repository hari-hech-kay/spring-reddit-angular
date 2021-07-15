import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { LoginResponse } from '../login/LoginResponse';
import { LoginRequest } from './../login/LoginRequest';
import { SignupRequest } from './../signup/signup.request';

const AUTH_API = 'http://www.localhost:8080/api/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  saveUser(response: LoginResponse) {
    this.localStorage.store('username', response.username);
    this.localStorage.store('token', response.token);
  }
  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  signup(signupRequestPayload: SignupRequest): Observable<string> {
    return this.httpClient.post(AUTH_API + '/signup', signupRequestPayload, {
      responseType: 'text',
    });
  }

  login(loginrequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      AUTH_API + '/login',
      loginrequest
    );
  }
}
