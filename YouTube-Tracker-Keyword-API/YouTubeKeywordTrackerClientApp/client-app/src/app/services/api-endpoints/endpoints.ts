export enum AuthenticationEndpoints {
  Authentication = '/Authentication/login',
  Register = 'Register',
}

export enum KeywordsEndpoints {
  GetAllKeywords = '/SearchKeyword/user',
  GetSingleKeyword = '/SearchKeyword/', // Id after /
  Keyword = '/SearchKeyword',
}

export enum UsersEndpoints {
  Users = '/Authentication/all',
  User = '/Authentication',
  UserPassword = '/Authentication/password',
}

export enum ReportsEndpoints {
  Report = '/Raport',
  ReportFile = '/Raport/file',
}

export enum MailEndpoints {
  Mail = '/Email',
}

export enum TranscriptionEndpoints {
  GenerateSubtitles = '/Subtitles/generateTranscription',
}
