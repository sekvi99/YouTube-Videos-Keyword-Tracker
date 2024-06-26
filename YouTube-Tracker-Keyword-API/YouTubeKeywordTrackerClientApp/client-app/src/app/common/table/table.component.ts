import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { IColumnDefinition } from './columns-definition';
import { Store } from '@ngrx/store';
import { IState } from '../../state';
import { fetch } from '../../state/data/data.actions';
import { dataSelector } from '../../state/data/data.selectors';
import { Observable, map } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TABLE_MAP_FUNCTIONS } from './map-functions';
import { DataReducerEntity } from '../../state/data/data.reducer';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  @Input() dataColumns?: IColumnDefinition[];
  @Input() entityType?: string;
  @Input() endpoint?: string;
  @Input() isSimpleMode: boolean = false;

  @Output('onEditClick') onEditClickEvent = new EventEmitter<any>();
  @Output('onDeleteClick') onDeleteClickEvent = new EventEmitter<any>();
  @Output('onRowClick') onRowClickEvent = new EventEmitter<any>();

  @ViewChild('tableRef', { static: true }) tableRef?: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  data$?: Observable<any>;
  loading: boolean = false;
  mapFunctions?: any = null;

  constructor(protected store: Store<IState>) {}

  ngOnInit(): void {
    if (!this.endpoint || !this.entityType) {
      return;
    }
    this.mapFunctions = this.getMapFunctions(this.entityType);
    this.store.dispatch(fetch({ endpoint: this.endpoint }));
    this.data$ = this.store
      .select(dataSelector, {
        entityType: this.entityType,
      })
      .pipe(
        map((data) => {
          if (this.mapFunctions !== null) {
            return this.mapFunctions(data);
          }
          return data;
        })
      );
    if (this.dataColumns) {
      this.data$.subscribe((data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  get columnLabels(): string[] | undefined {
    return this.dataColumns?.map((column) => column.columnName);
  }

  get columnsMap() {
    const propertyNameToColumnNameMap = new Map<string, string>();
    this.dataColumns?.forEach((propertyMap) => {
      propertyNameToColumnNameMap.set(
        propertyMap.propertyName,
        propertyMap.columnName
      );
    });
    return propertyNameToColumnNameMap;
  }

  get propertyNames(): string[] | undefined {
    return this.dataColumns?.map((column) => column.propertyName);
  }

  public onEditRowClick(event: any, row: any): void {
    this.onEditClickEvent.emit(row);
  }

  public onDeleteRowClick(event: any, row: any): void {
    this.onDeleteClickEvent.emit(row);
  }

  public onPageChange(event: any): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 150);
  }

  public onRowClick(event: any, row: any): void {
    if (!this.isSimpleMode) {
      return;
    }
    this.onRowClickEvent.emit(row);
  }

  private getMapFunctions(entityType: string): any {
    return TABLE_MAP_FUNCTIONS[entityType as DataReducerEntity];
  }
}
