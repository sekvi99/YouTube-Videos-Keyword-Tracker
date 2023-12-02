export interface INavigationItem {
    routeLink: string;
    icon: string;
    label: string;
    guard: (isAuthenticated: boolean | null, hasAdminRights: boolean | null) => boolean;
}

interface INavigation {
    pages: INavigationItem[]
}

export const pages: INavigation = {
    pages: [
        {
            routeLink: "/",
            icon: "home",
            label: "Strona główna",
            guard: (isAuthenticated, hasAdminRights) => isAuthenticated !== true && hasAdminRights !== true
        },
        {
            routeLink: "keywords",
            icon: "table",
            label: "Słowa kluczowe",
            guard: (isAuthenticated, _) => isAuthenticated === true
        },
        {
            routeLink: "account",
            icon: "settings",
            label: "Ustawienia konta",
            guard: (isAuthenticated, _) => isAuthenticated === true
        },
        {
            routeLink: "about",
            icon: "person_pin",
            label: "O projekcie",
            guard: (isAuthenticated, hasAdminRights) => isAuthenticated !== true && hasAdminRights !== true
        },
        {
            routeLink: "user-panel",
            icon: "supervisor_account",
            label: "Panel użytkowników",
            guard: (_, hasAdminRights) => hasAdminRights === true
        }
    ]
};