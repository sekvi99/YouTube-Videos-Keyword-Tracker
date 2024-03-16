import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { Store } from '@ngrx/store';
import { IState } from '../../state';
import {
  hasAdminRightsSelector,
  isAuthenticatedSelector,
} from '../../state/auth/auth.selectors';
import { HEADER_DEFINITIONS } from '../../common/header/header-definitions';
import { Observable, catchError, throwError } from 'rxjs';
import { IAppVersion } from '../../models/version/version';
import { VersionService } from '../../services/version.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  isUserAuthenticated$ = this.store.select(isAuthenticatedSelector);
  hadUserAdminRights$ = this.store.select(hasAdminRightsSelector);
  appVersion$: Observable<IAppVersion>;
  headerDefinition = HEADER_DEFINITIONS.mainPage;

  constructor(
    public navigationService: NavigationService,
    private store: Store<IState>,
    private versionService: VersionService,
    private toastService: ToastService
  ) {
    this.appVersion$ = this.versionService.getAppVersion().pipe(
      catchError((error) => {
        this.toastService.error(
          `Nie udało ustalić się wersji: ${error.message}`
        );
        return throwError(error);
      })
    );
  }

  get pages() {
    return this.navigationService.navigation.pages;
  }
}
