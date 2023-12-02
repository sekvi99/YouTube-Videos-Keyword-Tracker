import { Component } from '@angular/core';
import { HEADER_DEFINITIONS, IHeaderDefinition } from '../../common/header/header-definitions';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  headerDefinition: IHeaderDefinition = HEADER_DEFINITIONS.about;
}
