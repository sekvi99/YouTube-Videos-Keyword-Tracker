import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileBlobService } from '../../services/file.blob.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-preview',
  templateUrl: './pdf-preview.component.html',
  styleUrl: './pdf-preview.component.scss'
})
export class PdfPreviewComponent {
  pdfUrl!: SafeResourceUrl;

  @ViewChild('dialogContent', { static: true }) dialogContent!: TemplateRef<any>;

  constructor(private dialog: MatDialog, private pdfService: FileBlobService, private sanitizer: DomSanitizer) { }

  public openDialog(fileBytes: any): void {
    const unsafeUrl = this.pdfService.createPdfUrl(fileBytes);
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
    this.dialog.open(this.dialogContent, { width: '80%', height: '80%' });
}

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
