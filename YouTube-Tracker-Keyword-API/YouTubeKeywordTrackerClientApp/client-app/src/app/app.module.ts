import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/home/login/login.component';
import { RegisterComponent } from './pages/home/register/register.component';
import { AboutComponent } from './pages/about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './common/side-nav/side-nav.component';
import { MaterialModule } from './material-module';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './state/auth/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth/auth.effects';
import { AppConfig } from './app.config';
import { AuthenticationService } from './services/authentication.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationInterceptor } from './providers/authorization.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './common/table/table.component';
import { HeaderComponent } from './common/header/header.component';
import { dataReducer } from './state/data/data.reducer';
import { DataEffects } from './state/data/data.effects';
import { KeywordListComponent } from './pages/keyword-list/keyword-list.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslatedPaginatorIntl } from './providers/paginator.translation';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { DataDialogComponentComponent } from './common/data-dialog-component/data-dialog-component.component';
import { KeywordFormComponent } from './common/forms/keyword-form/keyword-form.component';
import { UserFormComponent } from './common/forms/user-form/user-form.component';
import { ToastService } from './services/toast.service';
import { ToastrModule } from 'ngx-toastr';
import { AddDataButtonComponent } from './common/buttons/add-data-button/add-data-button.component';
import { NoDataPipe } from './pipes/no.data.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    SideNavComponent,
    TableComponent,
    HeaderComponent,
    KeywordListComponent,
    UsersListComponent,
    DataDialogComponentComponent,
    KeywordFormComponent,
    UserFormComponent,
    AddDataButtonComponent,
    NoDataPipe
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forRoot({
      auth: authReducer,
      data: dataReducer
    }),
    EffectsModule.forRoot([AuthEffects, DataEffects]),
    ToastrModule.forRoot(),
  ],
  providers: [
    AppConfig,
    ToastService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    },
    {
      provide: MatPaginatorIntl,
      useClass: TranslatedPaginatorIntl
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
