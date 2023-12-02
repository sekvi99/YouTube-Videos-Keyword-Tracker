import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { IColumnDefinition } from './columns-definition';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() data: any;
  @Input() dataColumns?: IColumnDefinition[];

  @ViewChild('tableRef', { static: true }) tableRef?: ElementRef;

  columnLabels?: string[] = this.dataColumns?.map(column => column.columnName);
  propertyNames?: string[] = this.dataColumns?.map(column => column.propertyName);

  public onRowClick(row: any): void {
    console.log(row);
  }
}