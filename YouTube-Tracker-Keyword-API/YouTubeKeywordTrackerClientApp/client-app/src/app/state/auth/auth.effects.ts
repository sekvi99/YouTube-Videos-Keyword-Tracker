import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map, tap, mergeMap } from 'rxjs';
import { loginRequest, loginSuccess, loginFailure } from './auth.actions';

@Injectable()
export class AuthEffects {
    loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginRequest),
      mergeMap((action) => {  
        return this.authService
          .login(action.credentials.username, action.credentials.password)
          .pipe(
            map((loginSuccessResponse) =>
              loginSuccess({ loginSuccessResponse })
            ),
            catchError((error) => {
              console.error('Login error:', error);
              return of(loginFailure({ error }));
            })
          );
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(({ loginSuccessResponse }) => {
          this.router.navigateByUrl('/');
          localStorage.setItem('token', loginSuccessResponse.token);
          alert(
            'Login Successfull, Welcome!'
          );
          this.router.navigateByUrl('/about'); // TODO To change url
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router
  ) {}
}