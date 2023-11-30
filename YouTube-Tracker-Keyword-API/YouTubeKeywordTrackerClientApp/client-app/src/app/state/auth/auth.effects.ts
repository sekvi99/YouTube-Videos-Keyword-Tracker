import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map, tap, mergeMap } from 'rxjs';
import { 
  loginRequest, 
  loginSuccess, 
  loginFailure,
  registerRequest,
  registerFailure,
  registerSuccess,
  logout,
 } from './auth.actions';

@Injectable()
export class AuthEffects {
    // Login Actions
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

  // Register Actions
  registerRequest$ = createEffect(() =>
  this.actions$.pipe(
    ofType(registerRequest),
    mergeMap((action) => {  
      return this.authService
        .register(action.registerCredentials.username, action.registerCredentials.password, action.registerCredentials.city, action.registerCredentials.street, action.registerCredentials.postalCode)
        .pipe(
          map(() =>
            registerSuccess()
          ),
          catchError((error) => {
            console.error('Register error:', error);
            return of(registerFailure({ error }));
          })
        );
    }))
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccess),
        tap(() => {
          this.router.navigateByUrl('/');
          alert(
            'Successfull Registration, Please log in!'
          );
        })
      ),
    { dispatch: false }
  );

  // Logout Actions
  logout$ = createEffect(
    () => 
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          this.authService.logout();
          this.router.navigateByUrl('/');
          alert(
            'Log out'
          );
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