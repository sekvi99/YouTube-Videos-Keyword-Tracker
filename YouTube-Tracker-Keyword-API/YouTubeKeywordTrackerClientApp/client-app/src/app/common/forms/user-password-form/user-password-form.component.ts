import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IState } from '../../../state';
import { Store } from '@ngrx/store';
import { edit } from '../../../state/data/data.actions';
import { UsersEndpoints } from '../../../services/api-endpoints/endpoints';

@Component({
  selector: 'app-user-password-form',
  templateUrl: './user-password-form.component.html',
  styleUrl: './user-password-form.component.scss'
})
export class UserPasswordFormComponent {
  userPasswordForm: FormGroup = this.formBuilder.group({
    newPassword: [null, Validators.required],
    passwordConfirm: [null, Validators.required]
  })

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<IState>
  ) { }
  
  onSubmit(): void {
    if (!this.userPasswordForm.valid) {
      return;
    }
    
    const newPassword = this.userPasswordForm.value.newPassword;
    const newPasswordConfirm = this.userPasswordForm.value.passwordConfirm;

    if (newPassword !== newPasswordConfirm) {
      // TODO Throw a toast for mismatch in password
      return;
    }

    this.store.dispatch(edit({
      formData: this.userPasswordForm,
      endpoint: UsersEndpoints.UserPassword
    }))

  }
}
