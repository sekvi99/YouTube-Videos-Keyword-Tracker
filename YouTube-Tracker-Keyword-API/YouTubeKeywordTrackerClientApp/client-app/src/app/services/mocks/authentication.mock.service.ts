import { Observable, of } from 'rxjs';
import { IAuthLoginResponse } from '../../models/user/login/auth.login';

export class AuthenticationServiceMock {
  public logout(): void {
    console.log('logout');
  }

  public login(
    username: string,
    password: string
  ): Observable<IAuthLoginResponse> {
    return of({
      username: username,
      token: 'someTokenValue',
      roleId: 1,
    } as IAuthLoginResponse);
  }

  public register(
    username: string,
    password: string,
    city: string,
    street: string,
    postalCode?: string
  ): Observable<void> {
    return of();
  }
}
