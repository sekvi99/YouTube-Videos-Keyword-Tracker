import { Component } from '@angular/core';
import { FormComponent } from '../../../generic-components/form-component';
import { FormGroup, Validators } from '@angular/forms';
import { registerRequest } from '../../../state/auth/auth.actions';
import { RegisterActionMessages } from '../../../models/toast/toast-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends FormComponent {
  registerForm: FormGroup = this.formBuilder.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
    city: [null, Validators.required],
    street: [null, Validators.required],
    postalCode: [null, Validators.required]
  });

  override async onSubmit(): Promise<void> {
      if (this.registerForm.invalid) {
        return;
      }

      const registerCredentials = {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        city: this.registerForm.value.city,
        street: this.registerForm.value.street,
        postalCode: this.registerForm.value.postalCode
      }

      this.toastService.info(RegisterActionMessages.Info);
      this.store.dispatch(registerRequest({ registerCredentials }));
  }
}
