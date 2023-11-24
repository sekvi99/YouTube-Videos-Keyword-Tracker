import { Component } from '@angular/core';
import { FormComponent } from '../../../generic-components/form-component';
import { FormGroup, Validators } from '@angular/forms';

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

  override ngOnInit(): void {
    
  }

  override onSubmit(): void {
    if (this.loginForm.invalid) {
      // TODO Throw an toast that informs that provided data is not correct
      return ;
    }

    // TODO Add store authentication call
  }
}
