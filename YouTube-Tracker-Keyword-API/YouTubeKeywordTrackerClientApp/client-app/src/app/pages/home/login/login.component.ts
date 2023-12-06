import { Component } from '@angular/core';
import { FormComponent } from '../../../generic-components/form-component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
// import { isAuthenticatedSelector, isLoadingSelector } from '../../../store/authentication/authentication.selectors';
// import { errorsSelector } from '../../../store/authentication/authentication.selectors';
import { Store } from '@ngrx/store';
// import { IState } from '../../../store';
import { ActivatedRoute, Router } from '@angular/router';
import { loginRequest } from '../../../state/auth/auth.actions';
import { LoginActionMessages } from '../../../models/toast/toast-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends FormComponent {

  loginForm: FormGroup = this.formBuilder.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  });

  override async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      return ;
    }

    this.toastService.info(LoginActionMessages.Info);

    const credentials = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    
    this.store.dispatch(loginRequest({ credentials }));
  }
}
