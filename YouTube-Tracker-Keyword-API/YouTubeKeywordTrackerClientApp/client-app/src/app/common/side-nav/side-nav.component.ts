import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '../../state/auth/auth.actions';
import {
  hasAdminRightsSelector,
  isAuthenticatedSelector,
} from '../../state/auth/auth.selectors';
import { IState } from '../../state';
import { NavigationService } from '../../services/navigation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  isUserAuthenticated$ = this.store.select(isAuthenticatedSelector);
  hadUserAdminRights$ = this.store.select(hasAdminRightsSelector);
  collapsed: boolean = false;

  constructor(
    private store: Store<IState>,
    private router: Router,
    public navigationService: NavigationService
  ) {}

  public onLogout(): void {
    this.store.dispatch(logout());
  }

  public toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  public closeSidenav(): void {
    this.collapsed = false;
  }

  public isActiveRoute(route: string): boolean {
    return route === this.router.url.replace('/', '');
  }
}
