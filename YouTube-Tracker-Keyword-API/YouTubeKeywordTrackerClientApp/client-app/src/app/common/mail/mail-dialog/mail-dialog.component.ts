import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mail-dialog',
  templateUrl: './mail-dialog.component.html',
  styleUrl: './mail-dialog.component.scss'
})
export class MailDialogComponent {
  reportId?: number;

  @ViewChild('dialogContent', { static: true }) dialogContent!: TemplateRef<any>;

  constructor(
    private dialog: MatDialog
  ) { }

  public openDialog(reportId?: number): void {
    this.reportId = reportId;
    this.dialog.open(this.dialogContent, { width: '100vh' });
  }
}
