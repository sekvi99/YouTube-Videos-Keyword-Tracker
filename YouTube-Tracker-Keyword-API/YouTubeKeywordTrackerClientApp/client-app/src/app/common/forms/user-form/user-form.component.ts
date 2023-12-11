import { Component } from '@angular/core';
import { FormComponent } from '../../../generic-components/form-component';
import { FormGroup, Validators } from '@angular/forms';
import { DataActionMessages } from '../../../models/toast/toast-messages';
import { edit } from '../../../state/data/data.actions';
import { UsersEndpoints } from '../../../services/api-endpoints/endpoints';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent extends FormComponent {
  userForm: FormGroup = this.formBuilder.group({
    id: [null],
    username: [null, Validators.required],
    city: [null, Validators.required],
    street: [null, Validators.required],
    postalCode: [null]
  });

  public override ngOnInit(): void {
      if (this.data === undefined || this.data === null) {
        return;
      }
      this.userForm.patchValue(this.loadUserContent());
  }

  override async onSubmit(): Promise<void> {
    if (!this.userForm.valid) {
      return;
    }

    this.toastService.info(DataActionMessages.Info);
    this.editMode ? this.editUser() : this.addUser();
  }

  // TODO Think whether adding user should be based on this form
  private addUser() {
    
  }

  private editUser(): void {
    this.store.dispatch(edit({
      formData: this.userForm,
      endpoint: UsersEndpoints.User
    }))
  }

  private loadUserContent() {
    return {
      id: this.data.id,
      username: this.data.username,
      city: this.data.addressCity,
      street: this.data.addressStreet,
      postalCode: this.data.addressPostalCode
    }
  }
}
