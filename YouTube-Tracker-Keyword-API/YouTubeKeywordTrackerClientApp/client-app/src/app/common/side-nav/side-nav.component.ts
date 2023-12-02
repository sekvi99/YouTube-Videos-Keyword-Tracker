import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '../../state/auth/auth.actions';
import { hasAdminRightsSelector, isAuthenticatedSelector } from '../../state/auth/auth.selectors';
import { IState } from '../../state';
import { INavigationItem, pages } from './pages';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  isUserAuthenticated$ = this.store.select(isAuthenticatedSelector);
  hadUserAdminRights$ = this.store.select(hasAdminRightsSelector);
  collapsed: boolean = false;
  pages: INavigationItem[] = pages.pages;
  
  constructor(
    private store: Store<IState>
  ) { }
  
  public onLogout(): void 
  {
    this.store.dispatch(logout());
  }
  
  public toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  public closeSidenav(): void {
    this.collapsed = false;
  }
}