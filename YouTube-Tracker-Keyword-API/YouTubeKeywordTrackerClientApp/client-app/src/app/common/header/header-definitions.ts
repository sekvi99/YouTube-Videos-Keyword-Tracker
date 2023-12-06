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
}

export const HEADER_DEFINITIONS: IHeaderDefinitions = {
    home: {
        title: "Projekt magisterski",
        imgSource: "../../../assets/logo.jpg",
        imgAlt: "Logo"
    },
    about: {
        title: "O projekcie",
        imgSource: null,
        imgAlt: null
    },
    keywords: {
        title: "Słowa kluczowe",
        imgSource: null,
        imgAlt: null
    },
    accountSettings: {
        title: "Ustawienia konta",
        imgSource: null,
        imgAlt: null,
    },
    usersHub: {
        title: "Panel użytkowników",
        imgSource: null,
        imgAlt: null,
    }
}