import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IColumnDefinition } from '../table/columns-definition';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrl: './simple-table.component.scss'
})
export class SimpleTableComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  loading: boolean = false;

  @Input() data?: any;
  @Input() dataColumns?: IColumnDefinition[];

  @Output('onRowClick') onRowClickEvent = new EventEmitter<any>();

  @ViewChild('tableRef', { static: true }) tableRef?: ElementRef;

  ngOnInit(): void {
      if (this.dataColumns) {
        this.dataSource.data = this.data;
      }
  }

  get columnLabels(): string[] | undefined {
    return this.dataColumns?.map(column => column.columnName);
  }

  get propertyNames(): string[] | undefined {
    return this.dataColumns?.map(column => column.propertyName);
  }
  
  get columnsMap() {
    const propertyNameToColumnNameMap = new Map<string, string>();
    this.dataColumns?.forEach((propertyMap) => {
      propertyNameToColumnNameMap.set(propertyMap.propertyName, propertyMap.columnName);
    });
    return propertyNameToColumnNameMap;
  }

  public onPageChange(event: any): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 150);
  }

  public onRowClick(event: any, row: any): void {
    this.onRowClickEvent.emit(row);
  }
}
