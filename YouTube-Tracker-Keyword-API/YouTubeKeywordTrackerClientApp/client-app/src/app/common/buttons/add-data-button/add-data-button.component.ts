import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-data-button',
  templateUrl: './add-data-button.component.html',
  styleUrl: './add-data-button.component.scss'
})
export class AddDataButtonComponent {
  @Input() buttonLabel?: string;

  @Output('onAddDataButtonClick') onAddDataButtonClickEvent = new EventEmitter<any>();

  public onAddDataClick(event: any): void {
    this.onAddDataButtonClickEvent.emit(event);
  }
}
