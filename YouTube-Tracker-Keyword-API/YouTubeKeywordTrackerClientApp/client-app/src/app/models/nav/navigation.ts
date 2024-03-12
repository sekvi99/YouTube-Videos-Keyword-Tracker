export interface INavigationItem {
  routeLink: string;
  icon: string;
  label: string;
  guard: (
    isAuthenticated: boolean | null,
    hasAdminRights: boolean | null
  ) => boolean;
}

export interface INavigation {
  pages: INavigationItem[];
}
