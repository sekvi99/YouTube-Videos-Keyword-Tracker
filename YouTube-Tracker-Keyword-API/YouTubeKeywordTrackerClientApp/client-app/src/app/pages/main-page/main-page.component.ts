import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { Store } from '@ngrx/store';
import { IState } from '../../state';
import {
  hasAdminRightsSelector,
  isAuthenticatedSelector,
} from '../../state/auth/auth.selectors';
import { HEADER_DEFINITIONS } from '../../common/header/header-definitions';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  isUserAuthenticated$ = this.store.select(isAuthenticatedSelector);
  hadUserAdminRights$ = this.store.select(hasAdminRightsSelector);
  headerDefinition = HEADER_DEFINITIONS.mainPage;

  constructor(
    public navigationService: NavigationService,
    private store: Store<IState>
  ) {}

  get pages() {
    return this.navigationService.navigation.pages;
  }
}
