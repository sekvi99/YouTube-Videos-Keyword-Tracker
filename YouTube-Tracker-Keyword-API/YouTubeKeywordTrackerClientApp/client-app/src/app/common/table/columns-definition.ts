export interface IColumnDefinition {
    propertyName: string;
    columnName: string;
}

export const KEYWORD_COLUMNS_DEFINITION: IColumnDefinition[] = [
    { propertyName: "keyword", columnName: "Słowo kluczowe" },
    { propertyName: "dateCreated", columnName: "Data utworzenia" },
    { propertyName: "dateModified", columnName: "Data modyfikacji" }
]

// export const USERS_HUB_COLUMNS_DEFINITION: IColumnDefinition[] = [
//     { }
// ]