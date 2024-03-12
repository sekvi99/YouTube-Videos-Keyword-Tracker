import { Injectable } from '@angular/core';
import { INavigation } from '../models/nav/navigation';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  public get navigation(): INavigation {
    return this.getNavigationItems();
  }

  private getNavigationItems(): INavigation {
    return {
      pages: [
        {
          routeLink: '/',
          icon: 'home',
          label: 'Strona główna',
          guard: (isAuthenticated, hasAdminRights) =>
            isAuthenticated !== true && hasAdminRights !== true,
        },
        {
          routeLink: 'main-page',
          icon: 'domain',
          label: 'Strona Główna',
          guard: (isAuthenticated, _) => isAuthenticated === true,
        },
        {
          routeLink: 'keywords',
          icon: 'table',
          label: 'Słowa kluczowe',
          guard: (isAuthenticated, _) => isAuthenticated === true,
        },
        {
          routeLink: 'reports',
          icon: 'insert_drive_file',
          label: 'Raporty',
          guard: (isAuthenticated, _) => isAuthenticated === true,
        },
        {
          routeLink: 'account',
          icon: 'settings',
          label: 'Ustawienia konta',
          guard: (isAuthenticated, _) => isAuthenticated === true,
        },
        {
          routeLink: 'about',
          icon: 'person_pin',
          label: 'O projekcie',
          guard: (isAuthenticated, hasAdminRights) =>
            isAuthenticated !== true && hasAdminRights !== true,
        },
        {
          routeLink: 'user-panel',
          icon: 'supervisor_account',
          label: 'Panel użytkowników',
          guard: (_, hasAdminRights) => hasAdminRights === true,
        },
      ],
    };
  }
}
