import { Component } from '@angular/core';
import { ListComponent } from '../../../generic-components/list-component';
import { IReport } from '../../../models/report/report';
import { DataReducerEntity } from '../../../state/data/data.reducer';
import { ReportsEndpoints } from '../../../services/api-endpoints/endpoints';
import { REPORT_DEFAULT_COLUMNS_DEFINITION } from '../../../common/table/columns-definition';
import { HEADER_DEFINITIONS } from '../../../common/header/header-definitions';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.scss'
})
export class ReportListComponent extends ListComponent<IReport> {
  entityType = DataReducerEntity.Reports;
  endpoint = ReportsEndpoints.Report;
  columns = REPORT_DEFAULT_COLUMNS_DEFINITION;
  headerDefinition = HEADER_DEFINITIONS.report;

  // TODO Refactor make those methods not mandatory to override
  override editDataClick(data: IReport): void {
    throw new Error('Method not implemented.');
  }
  override deleteDataClick(data: IReport): void {
    throw new Error('Method not implemented.');
  }
}
