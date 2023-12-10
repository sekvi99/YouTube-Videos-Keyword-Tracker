import { Component } from '@angular/core';
import { HEADER_DEFINITIONS, IHeaderDefinition } from '../../common/header/header-definitions';
import { AboutSections } from './about-sections';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500)
      ]),
      transition(':leave', [
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AboutComponent {
  headerDefinition: IHeaderDefinition = HEADER_DEFINITIONS.about;
  sections = AboutSections;

  // * Sections definition
  sectionVisibility: { [key: string]: boolean } = {
    author: false,
    technologies: false,
    description: false
  };

  toggleSection(section: string): void {
    this.sectionVisibility[section] = !this.sectionVisibility[section];
  }

  isSectionVisible(section: string): boolean {
    return this.sectionVisibility[section];
  }
}
