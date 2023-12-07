import { Component } from '@angular/core';
import { FormComponent } from '../../../generic-components/form-component';
import { FormGroup, Validators } from '@angular/forms';
import { edit, upload } from '../../../state/data/data.actions';
import { KeywordsEndpoints } from '../../../services/api-endpoints/endpoints';
import { DataActionMessages } from '../../../models/toast/toast-messages';

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

  public override ngOnInit(): void {
    this.keywordForm.patchValue(this.loadKeywordContent());
  }

  override async onSubmit(): Promise<void> {
      if (!this.keywordForm.valid) {
        return;
      }

      this.toastService.info(DataActionMessages.Info);

      switch(this.editMode) {
        case true:
          this.editKeyword();
          break;

        case false:
          this.addKeyword();
          break;
      }
  }

  private addKeyword(): void {
    this.store.dispatch(upload({
      formData: this.keywordForm,
      endpoint: KeywordsEndpoints.Keyword
    }))
  }

  private editKeyword(): void {
    this.store.dispatch(edit({
      formData: this.keywordForm,
      endpoint: KeywordsEndpoints.Keyword
    }))
  }

  private loadKeywordContent() {
    return {
      id: this.data.id,
      keyword: this.data.keyword
    }
  }
}
