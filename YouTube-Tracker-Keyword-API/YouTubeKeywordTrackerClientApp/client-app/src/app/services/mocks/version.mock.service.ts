import { Observable, of } from 'rxjs';
import { IAppVersion } from '../../models/version/version';

export class VersionServiceMock {
  public getAppVersion(): Observable<IAppVersion> {
    return of({
      author: 'testAuthor',
      email: 'testEmail@gmail.com',
      message: 'Some commit message',
      date: new Date(),
      sha: '000000000000001',
    } as IAppVersion);
  }
}
