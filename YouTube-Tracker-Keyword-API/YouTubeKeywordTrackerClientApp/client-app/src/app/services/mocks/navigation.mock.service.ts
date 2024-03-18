import { INavigation, INavigationItem } from '../../models/nav/navigation';

export class NavigationServiceMock {
  public get navigation(): INavigation {
    return {
      pages: [
        {
          routeLink: '/',
          icon: 'home',
          label: 'Strona główna',
          guard: (isAuthenticated, hasAdminRights) =>
            isAuthenticated !== true && hasAdminRights !== true,
        } as INavigationItem,
      ],
    };
  }
}
