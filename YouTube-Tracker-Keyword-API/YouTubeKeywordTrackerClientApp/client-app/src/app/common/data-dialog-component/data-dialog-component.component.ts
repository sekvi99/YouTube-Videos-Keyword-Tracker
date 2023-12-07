import { Component, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IState } from '../../state';
import { DataReducerEntity } from '../../state/data/data.reducer';

@Component({
  selector: 'app-data-dialog-component',
  templateUrl: './data-dialog-component.component.html',
  styleUrl: './data-dialog-component.component.scss'
})
export class DataDialogComponentComponent {
  formData?: any;
  entityType?: string;
  editMode?: boolean;

  @ViewChild('dialogContent', { static: true }) dialogContent!: TemplateRef<any>;

  reducers = DataReducerEntity;

  constructor(
    private dialog: MatDialog,
    private store: Store<IState>
  ) { }

  get reducerVars() {
    return this.reducers;
  }

  public openDialog(formData: any, entityType: string, editMode: boolean): void {
    this.formData = formData;
    this.entityType = entityType;
    this.editMode = editMode;

    this.dialog.open(this.dialogContent, { width: '100vh' });
  }
  
  public onFormSuccessfull(event: any): void {
    // TODO Refresh component then
  }
}
