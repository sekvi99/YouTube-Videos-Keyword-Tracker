export interface IColumnDefinition {
    propertyName: string;
    columnName: string;
}

export const KEYWORD_COLUMNS_DEFINITION: IColumnDefinition[] = [
    { propertyName: "keyword", columnName: "Słowo kluczowe" },
    { propertyName: "dateCreated", columnName: "Data utworzenia" },
    { propertyName: "dateModified", columnName: "Data modyfikacji" }
];

export const USERS_HUB_COLUMNS_DEFINITION: IColumnDefinition[] = [
    { propertyName: "username", columnName: "Nazwa użytkownika" },
    { propertyName: "addressCity", columnName: "Miasto" },
    { propertyName: "addressStreet", columnName: "Ulica" },
    { propertyName: "adressPostalCode", columnName: "Kod pocztowy" },
    { propertyName: "roleId", columnName: "Rola" }
];

export const REPORT_DEFAULT_COLUMNS_DEFINITION: IColumnDefinition[] = [
    { propertyName: "readoutsCount", columnName: "Liczba statystyk w raporcie" },
];