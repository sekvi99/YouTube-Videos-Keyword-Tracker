export interface IHeaderDefinition {
    title: string;
    imgSource: string | null;
    imgAlt: string | null;
} 

interface IHeaderDefinitions {
    home: IHeaderDefinition;
    about: IHeaderDefinition;
    keywords: IHeaderDefinition;
    accountSettings: IHeaderDefinition;
    usersHub: IHeaderDefinition;
    report: IHeaderDefinition;
}

export const HEADER_DEFINITIONS: IHeaderDefinitions = {
    home: {
        title: "Projekt magisterski",
        imgSource: "../../../assets/logo.jpg",
        imgAlt: "Logo"
    },
    about: {
        title: "O projekcie",
        imgSource: "../../../assets/logo.jpg",
        imgAlt: "Logo"
    },
    keywords: {
        title: "Słowa kluczowe",
        imgSource: "../../../assets/logo.jpg",
        imgAlt: "Logo"
    },
    accountSettings: {
        title: "Ustawienia konta",
        imgSource: "../../../assets/logo.jpg",
        imgAlt: "Logo",
    },
    usersHub: {
        title: "Panel użytkowników",
        imgSource: "../../../assets/logo.jpg",
        imgAlt: "Logo",
    },
    report: {
        title: "Raporty",
        imgSource: "../../../assets/logo.jpg",
        imgAlt: "Logo",
    }
}