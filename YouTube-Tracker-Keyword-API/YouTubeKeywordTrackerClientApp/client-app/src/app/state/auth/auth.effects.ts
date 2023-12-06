import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, map, tap, mergeMap } from 'rxjs';
import { 
  loginRequest, 
  loginSuccess, 
  loginFailure,
  registerRequest,
  registerFailure,
  registerSuccess,
  logout,
 } from './auth.actions';
import { ToastService } from '../../services/toast.service';
import { LoginActionMessages, LogoutActionMessages, RegisterActionMessages } from '../../models/toast/toast-messages';

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
            map((loginSuccessResponse) => {
              this.router.navigate(['/keywords']);
              return loginSuccess({ loginSuccessResponse });
            }
            ),
            catchError((error) => {
              this.toastService.error(LoginActionMessages.Error);
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
          this.toastService.success(LoginActionMessages.Success);
          this.router.navigate(['/keywords']);
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
            this.toastService.error(RegisterActionMessages.Error);
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
          this.toastService.success(RegisterActionMessages.Success);
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
          this.toastService.success(LogoutActionMessages.Success);
        })
      ),
      { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router,
    private toastService: ToastService
  ) {}
}