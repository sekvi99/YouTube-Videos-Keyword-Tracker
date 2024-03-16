import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { IAppVersion } from '../models/version/version';

@Injectable({ providedIn: 'root' })
export class VersionService {
  private readonly _versionUrl: string = '/version';

  constructor(private dataService: DataService) {}

  public getAppVersion(): Observable<IAppVersion> {
    return this.dataService.fetch<IAppVersion>(this._versionUrl);
  }
}
