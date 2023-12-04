export enum AuthenticationEndpoints {
    Authentication = '/Authentication/login',
    Register = 'Register'
}

export enum KeywordsEndpoints {
    GetAllKeywords = 'SearchKeyword/user',
    GetSingleKeyword = 'SearchKeyword/', // Id after /
}

export enum UsersEndpoints {
    Users = 'api/Authentication/all',
    User = 'api/Authentication'
}