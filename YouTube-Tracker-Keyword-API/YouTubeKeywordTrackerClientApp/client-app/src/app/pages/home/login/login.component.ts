import { Component } from '@angular/core';
import { FormComponent } from '../../../generic-components/form-component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { isAuthenticatedSelector, isLoadingSelector } from '../../../store/authentication/authentication.selectors';
import { errorsSelector } from '../../../store/authentication/authentication.selectors';
import { Store, select } from '@ngrx/store';
import { IState } from '../../../store';
import { ActivatedRoute, Router } from '@angular/router';
import { login } from '../../../store/authentication/authentication.action';

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

  isLoading$ = this.store.select(isLoadingSelector);
  errors$ = this.store.select(errorsSelector);

  constructor(
    private store: Store<IState>,
    protected override formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    super(formBuilder);
    this.store.pipe(
      select(isAuthenticatedSelector)
    )
    .subscribe(result => {
      if (result) {
        this.router.navigate(['main-page']);
      }
    })
  }

  override onSubmit(): void {
    if (this.loginForm.invalid) {
      // TODO Throw an toast that informs that provided data is not correct
      return ;
    }

    // TODO Add store authentication call
    this.store.dispatch(login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }))
  }
}
