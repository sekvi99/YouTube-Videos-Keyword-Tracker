import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() title?: string;
  @Input() imgSource?: string | null;
  @Input() imgAlt?: string | null;
}
