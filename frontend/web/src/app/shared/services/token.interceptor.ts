import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import {
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { BehaviorSubject } from 'rxjs';

let isRefreshing = false;
let refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<
  string | null
>(null);

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();

  let authReq = req;
  if (token) {
    authReq = addTokenHeader(req, token);
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401Error(authReq, next, authService);
      }
      return throwError(() => error);
    })
  );
};

function addTokenHeader(
  request: HttpRequest<any>,
  token: string
): HttpRequest<any> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function handle401Error(
  request: HttpRequest<any>,
  next: HttpHandlerFn,
  authService: AuthService
): Observable<HttpEvent<any>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((tokenData) => {
        isRefreshing = false;
        if (tokenData.access_token) {
          authService.setAccessToken(tokenData.access_token);
          refreshTokenSubject.next(tokenData.access_token);
          return next(addTokenHeader(request, tokenData.access_token));
        } else {
          console.error('No se encontró el accessToken');
          return next(request);
        }
      }),
      catchError((err) => {
        isRefreshing = false;
        authService.logout();
        return throwError(() => err);
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next(addTokenHeader(request, token!)))
    );
  }
}
