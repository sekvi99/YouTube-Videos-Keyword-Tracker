import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '../../state/auth/auth.actions';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  constructor(
    private store: Store
  ) { }
  
    public onLogout(): void 
    {
      this.store.dispatch(logout());
    } 

}
