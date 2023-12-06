import { Component } from '@angular/core';
import { HEADER_DEFINITIONS, IHeaderDefinition } from '../../common/header/header-definitions';
import { Store } from '@ngrx/store';
import { IState } from '../../state';
import { isAuthenticatedSelector } from '../../state/auth/auth.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  headerDefinition: IHeaderDefinition = HEADER_DEFINITIONS.home;

  constructor(
    private store: Store<IState>,
    private router: Router
  ) {
    if (!this.store.select(isAuthenticatedSelector))
    {
      return;
    }
    this.router.navigateByUrl('/keywords');
  }

}
