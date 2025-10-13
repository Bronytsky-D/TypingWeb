import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TokenService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();

  get accessToken(): string | null {
    return this.tokenSubject.value;
  }

  set(token: string): void {
    this.tokenSubject.next(token);
  }

  clear(): void {
    this.tokenSubject.next(null);
  }

  isExpired(): boolean {
    const token = this.accessToken;
    if (!token) return true;

    const decoded: any = jwtDecode(token);
    return Date.now() >= decoded['exp'] * 1000;
  }
}