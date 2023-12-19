import { Component } from '@angular/core';
import { ListComponent } from '../../../generic-components/list-component';
import { IReport } from '../../../models/report/report';
import { DataReducerEntity } from '../../../state/data/data.reducer';
import { ReportsEndpoints } from '../../../services/api-endpoints/endpoints';
import { REPORT_DEFAULT_COLUMNS_DEFINITION } from '../../../common/table/columns-definition';
import { HEADER_DEFINITIONS } from '../../../common/header/header-definitions';
import { AddDataButtonLabels } from '../../../common/buttons/add-data-button/add.data.buttons';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { IState } from '../../../state';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { ToastService } from '../../../services/toast.service';
import { ReportMessages } from '../../../models/toast/toast-messages';

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
  addDataButtonLabel = AddDataButtonLabels.AddKeywordButton;

  isRaportCreating$ = new BehaviorSubject<boolean>(false);

  constructor(
    protected override store: Store<IState>, 
    protected override router: Router, 
    private dataService: DataService,
    private toastService: ToastService) {
    super(store, router);
  }

  public onRowClick(report: IReport): void {
    if (report === undefined) {
      return;
    }
    this.router.navigateByUrl(`report/${report.id}`);
  }

  public onGenerateNewRaport(event: any): void {
    this.toastService.info(ReportMessages.ReportCreationInfo);

    this.isRaportCreating$.next(true);
    this.dataService.create(ReportsEndpoints.Report)
    .subscribe({
      next: (response) => {
        this.toastService.success(ReportMessages.ReportCreationSuccess);
        this.isRaportCreating$.next(false);

        // TODO Refactor to avoid setTimeout
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      error: () => {
        this.toastService.error(ReportMessages.ReportCreationError);
        this.isRaportCreating$.next(false);
      }
    });
  }

  // TODO Refactor make those methods not mandatory to override
  override editDataClick(data: IReport): void {
    throw new Error('Method not implemented.');
  }
  override deleteDataClick(data: IReport): void {
    throw new Error('Method not implemented.');
  }
}
