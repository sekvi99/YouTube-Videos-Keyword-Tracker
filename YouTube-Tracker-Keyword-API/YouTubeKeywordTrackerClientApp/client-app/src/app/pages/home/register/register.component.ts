import { Component } from '@angular/core';
import { FormComponent } from '../../../generic-components/form-component';
import { FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { registerRequest } from '../../../state/auth/auth.actions';

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

  constructor(
    private store: Store,
    protected override formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    super(formBuilder);
  }

  override async onSubmit(): Promise<void> {
      if (this.registerForm.invalid) {
        // TODO Add toast service there that informs that invalid that has been passed
        return;
      }

      const registerCredentials = {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        city: this.registerForm.value.city,
        street: this.registerForm.value.street,
        postalCode: this.registerForm.value.postalCode
      }
      
      this.store.dispatch(registerRequest({ registerCredentials }));
  }
}
