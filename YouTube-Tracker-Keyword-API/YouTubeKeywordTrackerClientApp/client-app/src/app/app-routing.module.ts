import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthorizationGuard } from './providers/auth.guard';
import { AdminRightsGuard } from './providers/admin.rights.guard';
import { KeywordListComponent } from './pages/keyword-list/keyword-list.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserAccountViewComponent } from './pages/account/user-account-view/user-account-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'keywords', component: KeywordListComponent, canActivate: [AuthorizationGuard] },
  { path: 'user-panel', component: UsersListComponent, canActivate: [AdminRightsGuard] },
  { path: 'account', component: UserAccountViewComponent, canActivate: [AuthorizationGuard] },
  { path: '**', redirectTo: '' } // * Has to be last one
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
