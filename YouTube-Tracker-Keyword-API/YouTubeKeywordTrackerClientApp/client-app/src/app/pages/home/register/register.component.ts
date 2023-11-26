import { Component } from '@angular/core';
import { FormComponent } from '../../../generic-components/form-component';
import { FormGroup, Validators } from '@angular/forms';

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
        // TODO Add toast service there that informs that invalid that has been passed
        return;
      }
  }
}
