import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthorizationGuard } from './providers/auth.guard';
import { AdminRightsGuard } from './providers/admin.rights.guard';
import { KeywordListComponent } from './pages/keyword-list/keyword-list.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserAccountViewComponent } from './pages/account/user-account-view/user-account-view.component';
import { ReportListComponent } from './pages/reports/report-list/report-list.component';
import { ReportDetailsComponent } from './pages/reports/report-details/report-details.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SubtitlesGeneratePageComponent } from './pages/subtitles-generate-page/subtitles-generate-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'main-page',
    component: MainPageComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'keywords',
    component: KeywordListComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'reports',
    component: ReportListComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'report/:id',
    component: ReportDetailsComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'user-panel',
    component: UsersListComponent,
    canActivate: [AdminRightsGuard],
  },
  {
    path: 'account',
    component: UserAccountViewComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'generate-subtitles',
    component: SubtitlesGeneratePageComponent,
    canActivate: [AuthorizationGuard],
  },
  { path: '**', redirectTo: 'main-page' }, // * Has to be last one
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
