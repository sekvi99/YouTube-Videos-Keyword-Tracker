import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IState } from '../../../state';
import { userSelector } from '../../../state/auth/auth.selectors';
import { Observable } from 'rxjs';
import { HEADER_DEFINITIONS } from '../../../common/header/header-definitions';

@Component({
  selector: 'app-user-account-view',
  templateUrl: './user-account-view.component.html',
  styleUrl: './user-account-view.component.scss'
})
export class UserAccountViewComponent {
  user$: Observable<{ user: string | null; roleId: string | null; }> = this.store.select(userSelector);

  headerDefinition = HEADER_DEFINITIONS.accountSettings;

  constructor(
    private store: Store<IState>
  ) { }
}
