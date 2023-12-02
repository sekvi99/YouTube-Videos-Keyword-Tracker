import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IColumnDefinition } from './columns-definition';
import { Store } from '@ngrx/store';
import { IState } from '../../state';
import { fetch } from '../../state/data/data.actions';
import { dataSelector } from '../../state/data/data.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  @Input() dataColumns?: IColumnDefinition[];
  @Input() entityType?: string;
  @Input() endpoint?: string;

  @ViewChild('tableRef', { static: true }) tableRef?: ElementRef;

  data$?: Observable<any>;
  columnLabels?: string[] = this.dataColumns?.map(column => column.columnName);
  propertyNames?: string[] = this.dataColumns?.map(column => column.propertyName);

  constructor(
    protected store: Store<IState>
  ) {

  }

  ngOnInit(): void {
    if (!this.endpoint || !this.entityType) {
      return;
    }
    this.store.dispatch(fetch({ endpoint: this.endpoint }))
    this.data$ = this.store.select(dataSelector, { entityType: this.entityType })
  }

  public onRowClick(row: any): void {
    console.log(row);
  }
}