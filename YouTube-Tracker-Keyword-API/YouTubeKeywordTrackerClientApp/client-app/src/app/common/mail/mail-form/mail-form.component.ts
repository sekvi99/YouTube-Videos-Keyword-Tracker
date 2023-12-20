import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormComponent } from '../../../generic-components/form-component';
import { MailMessages } from '../../../models/toast/toast-messages';
import { MailEndpoints } from '../../../services/api-endpoints/endpoints';

@Component({
  selector: 'app-mail-form',
  templateUrl: './mail-form.component.html',
  styleUrl: './mail-form.component.scss'
})
export class MailFormComponent extends FormComponent {
  sentMailForm: FormGroup = this.formBuilder.group({
    topic: [null, Validators.required],
    receiver: [null, Validators.compose([Validators.required, Validators.email])],
    body: [null]
  });

  override async onSubmit(): Promise<void> {
    if (this.sentMailForm.invalid && this.data) {
      return ;
    }

    this.toastService.info(MailMessages.MailInfo);

    this.dataService.post(`${MailEndpoints.Mail}/${this.data}`, this.sentMailForm.value)
    .subscribe({
      next: () => this.toastService.success(MailMessages.MailSuccess),
      error: () => this.toastService.error(MailMessages.MailError)
    });
  }
}
