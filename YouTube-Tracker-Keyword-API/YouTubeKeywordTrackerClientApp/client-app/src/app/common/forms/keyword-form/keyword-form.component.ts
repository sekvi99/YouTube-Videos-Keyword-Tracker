import { Component } from '@angular/core';
import { FormComponent } from '../../../generic-components/form-component';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-keyword-form',
  templateUrl: './keyword-form.component.html',
  styleUrl: './keyword-form.component.scss'
})
export class KeywordFormComponent extends FormComponent {

  keywordForm: FormGroup = this.formBuilder.group({
    id: [null],
    keyword: [null, Validators.required]
  })

  override async onSubmit(): Promise<void> {
      if (!this.keywordForm.valid) {
        return;
      }
      try
      {
        // this.store.dispatch();
      }
      catch
      {
        // TODO Add toast service for error there 
      }
  }

  // override loadDataFromValues(): void {
  //   throw new Error('Method not implemented.');
  // }
}
