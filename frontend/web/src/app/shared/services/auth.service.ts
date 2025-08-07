import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User, LoginRequest, AuthResponse, RegisterRequest } from '../interfaces/auth.interface';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://127.0.0.1:8000/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'auth_refresh_token';
  private userKey = 'auth_user';

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  get currentUser$(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap((response) => {
          if (response.success && response.user && response.access_token) {
            this.setSession(
              response.user,
              response.access_token,
              credentials.rememberMe,
              response.refresh_token
            );
          }
        }),
        catchError((error) => {
          console.error('Login error:', error);
          return of({
            success: false,
            message: 'Error en el servidor. Intenta de nuevo.',
          });
        })
      );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/register`, userData)
      .pipe(
        catchError((error) => {
          console.error('Register error:', error);
          return of({
            success: false,
            message: 'Error en el servidor. Intenta de nuevo.',
          });
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.refreshTokenKey);
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userKey);
    sessionStorage.removeItem(this.refreshTokenKey);

    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  }

  getToken(): string | null {
    return (
      localStorage.getItem(this.tokenKey) ||
      sessionStorage.getItem(this.tokenKey)
    );
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  setAccessToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken =
    localStorage.getItem(this.refreshTokenKey) ||
    sessionStorage.getItem(this.refreshTokenKey);

    if (!refreshToken) {
      return of({ success: false, message: 'No refresh token available' });
    }
    console.log("Hice el refresh");
    
    return this.http
      .post<AuthResponse>(`${this.API_URL}/refresh`, { refresh_token: refreshToken })
      .pipe(
        tap((response) => {
          if (response.success && response.user && response.access_token && response.refresh_token) {
            const rememberMe = localStorage.getItem(this.tokenKey) !== null;
            this.setSession(response.user, response.access_token, rememberMe, response.refresh_token);
          }
        }),
        catchError((error) => {
          console.error('Token refresh error:', error);
          this.logout();
          return of({
            success: false,
            message: 'Sesión expirada. Por favor, inicia sesión nuevamente.',
          });
        })
      );
  }

  forgotPassword(email: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/forgot-password`, { email })
      .pipe(
        catchError((error) => {
          console.error('Forgot password error:', error);
          return of({
            success: false,
            message: 'Error en el servidor. Intenta de nuevo.',
          });
        })
      );
  }

  resetPassword(token: string, newPassword: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/reset-password`, {
        token,
        newPassword,
      })
      .pipe(
        catchError((error) => {
          console.error('Reset password error:', error);
          return of({
            success: false,
            message: 'Error en el servidor. Intenta de nuevo.',
          });
        })
      );
  }

  private setSession(user: User, token: string, rememberMe = false, refreshToken?: string): void {
    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem(this.tokenKey, token);
    storage.setItem(this.userKey, JSON.stringify(user));

    if (refreshToken) {
      storage.setItem(this.refreshTokenKey, refreshToken);
    }

    this.currentUserSubject.next(user);
  }

  private loadUserFromStorage(): void {
    const userStr =
      localStorage.getItem(this.userKey) ||
      sessionStorage.getItem(this.userKey);

    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error parsing user from storage:', error);
        this.logout();
      }
    }
  }
}
