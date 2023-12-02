import { Component } from '@angular/core';
import { HEADER_DEFINITIONS, IHeaderDefinition } from '../../common/header/header-definitions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  headerDefinition: IHeaderDefinition = HEADER_DEFINITIONS.home;
}
