import { Component } from '@angular/core';
import { HEADER_DEFINITIONS } from '../../common/header/header-definitions';
import { FormGroup, Validators } from '@angular/forms';
import { FormComponent } from '../../generic-components/form-component';
import { GenerateSubtitlesMessages } from '../../models/toast/toast-messages';
import { TranscriptionEndpoints } from '../../services/api-endpoints/endpoints';
import { BehaviorSubject, catchError, throwError } from 'rxjs';

const REQUIRED_URL_PATTERN = 'youtube';
@Component({
  selector: 'app-subtitles-generate-page',
  templateUrl: './subtitles-generate-page.component.html',
  styleUrl: './subtitles-generate-page.component.scss',
})
export class SubtitlesGeneratePageComponent extends FormComponent {
  headerDefinition = HEADER_DEFINITIONS.subtitlesPage;
  generateSubtitlesForm: FormGroup = this.formBuilder.group({
    videoUrl: [null, Validators.required],
  });
  subtitles?: string;
  isGenerateSubtitlesInProgress$ = new BehaviorSubject<boolean>(false);

  override async onSubmit(): Promise<void> {
    if (this.generateSubtitlesForm.invalid) {
      return;
    }

    const urlValue: string = this.generateSubtitlesForm.get('videoUrl')?.value;
    if (!urlValue.toLowerCase().includes(REQUIRED_URL_PATTERN)) {
      this.toastService.error(GenerateSubtitlesMessages.UrlError);
      return;
    }

    this.toastService.info(GenerateSubtitlesMessages.Info);
    this.isGenerateSubtitlesInProgress$.next(true);
    this.dataService
      .post(
        TranscriptionEndpoints.GenerateSubtitles,
        this.generateSubtitlesForm.value
      )
      .pipe(
        catchError((error) => {
          this.toastService.error(GenerateSubtitlesMessages.TranscriptError);
          return throwError(error);
        })
      )
      .subscribe({
        next: (subtitles: any) => {
          this.subtitles = subtitles;
          const blob = new Blob([subtitles], {
            type: 'text/plain;charset=utf-8',
          });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'subtitles.srt';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          this.toastService.success(GenerateSubtitlesMessages.Success);
          this.isGenerateSubtitlesInProgress$.next(false);
        },
        error: (err) => {
          this.toastService.error(GenerateSubtitlesMessages.TranscriptError);
          this.isGenerateSubtitlesInProgress$.next(false);
        },
      });
  }
}
