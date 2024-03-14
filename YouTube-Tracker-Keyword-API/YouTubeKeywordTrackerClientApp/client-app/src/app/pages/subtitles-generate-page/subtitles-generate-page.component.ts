import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HEADER_DEFINITIONS } from '../../common/header/header-definitions';

@Component({
  selector: 'app-subtitles-generate-page',
  templateUrl: './subtitles-generate-page.component.html',
  styleUrl: './subtitles-generate-page.component.scss',
})
export class SubtitlesGeneratePageComponent {
  headerDefinition = HEADER_DEFINITIONS.subtitlesPage;

  constructor(private dataService: DataService) {}

  public handleSubtitlesGenerate(videoUrl: string): void {}
}
