export enum LoginActionMessages {
    Info = 'Logowanie do systemu!',
    Error = 'Wystąpił błąd, nie udało się zalogować!',
    Success = 'Witaj, poprawnie zalogowano!'
}

export enum RegisterActionMessages {
    Info = 'Rejestrowanie użytkownika w systemie',
    Error = 'Wystąpił błąd, nie udało się zarejstrować użytkownika w systemie',
    Success = 'Sukces, poprawnie zarejestrowano!',
    PasswordMismatchError = 'Wystąpił błąd, wprowadzone hasła nie są takie same',
}

export enum LogoutActionMessages {
    Success = 'Sukces, poprawnie wylogowano!',
    NotAuthorized = 'Nastąpi wylogowanie, token wygasł!'
}

export enum DataActionMessages {
    Info = 'Dodawanie danych!',
    AddSuccess = 'Sukces, poprawnie dodano dane!',
    AddError = 'Wystąpił błąd, nie udało się dodać danych!',
    EditSuccess = 'Sukces, udało się zmienić dane!',
    EditError = 'Wystąpił błąd, nie udało się zmienić danych',
    DeleteSuccess = 'Sukces, udało się usunąć dane!',
    DeleteError = 'Wystąpił błąd, nie udało usunąć się danych'
}

export enum FileMessages {
    FetchError = 'Wystąpił błąd, nie udało pobrać się zawartości pliku!'
}

export enum ReportMessages {
    ReportCreationInfo = 'Generowanie nowego raportu!',
    ReportCreationSuccess = 'Sukces, pomyślnie utworzono nowy raport!',
    ReportCreationError = 'Wystąpił błąd, nie udało się stworzyć nowego raportu!',
}