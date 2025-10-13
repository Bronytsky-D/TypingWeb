import { Injectable } from '@angular/core';
import { enviromentAuth } from '../../../../environments/enviromentAuth';
import { LoginRequest } from '../interfaces/login-request';
import { RegistrationRequest } from '../interfaces/registration-request';
import { AuthResponse } from '../interfaces/auth-response';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ExecutionResponse } from '../interfaces/execution-response'
import { UserManagerService } from './user-manager.service ';
import { TokenService } from './token.service';
import { JwtUtilService } from './jwt-util.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = enviromentAuth.apiUrlAuth;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private userManager: UserManagerService,
    private jwtUtil: JwtUtilService
  ) {}

  login(data: LoginRequest): Observable<ExecutionResponse<string>> {
    return this.http.post<ExecutionResponse<string>>(`${this.apiUrl}login`, data, {
      withCredentials: true
    }).pipe(
      tap((res) => {
        if (res.success) this.handleToken(res.result);
      })
    );
  }

  register(data: RegistrationRequest): Observable<ExecutionResponse<string>> {
    return this.http.post<ExecutionResponse<string>>(`${this.apiUrl}register`, data, {
      withCredentials: true
    }).pipe(
      tap((res) => {
        if (res.success) this.handleToken(res.result);
      })
    );
  }

  googleLogin(idToken: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}Auth/google-login`, { idToken }, {
      withCredentials: true
    }).pipe(
      tap(res => {
        if (res.isSuccess) this.handleToken(res.token);
      })
    );
  }

  refreshToken(): Observable<ExecutionResponse<string>> {
    return this.http.post<ExecutionResponse<string>>(`${this.apiUrl}refresh`, {}, {
      withCredentials: true
    }).pipe(
      tap((res) => {
        if (res.success) this.tokenService.set(res.result);
      })
    );
  }

  logout(): void {
    this.tokenService.clear();
    this.userManager.clear();
    this.http.post(`${this.apiUrl}Auth/logout`, {}, { withCredentials: true }).subscribe();
  }

  isLoggedIn(): boolean {
    const token = this.tokenService.accessToken;
    return !!token && !this.tokenService.isExpired();
  }

  private handleToken(token: string): void {
    this.tokenService.set(token);
    const user = this.jwtUtil.decode(token);
    this.userManager.setUser(user);
  }
}