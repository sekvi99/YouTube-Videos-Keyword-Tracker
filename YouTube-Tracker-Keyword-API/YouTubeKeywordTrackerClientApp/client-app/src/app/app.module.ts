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
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forRoot({ auth: authReducer, data: dataReducer }),
    EffectsModule.forRoot([AuthEffects, DataEffects])
  ],
  providers: [
    AppConfig,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
