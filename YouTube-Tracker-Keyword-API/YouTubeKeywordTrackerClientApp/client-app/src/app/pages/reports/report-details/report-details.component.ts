import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { IReportDetails } from '../../../models/report/report-details';
import { DataService } from '../../../services/data.service';
import { Store } from '@ngrx/store';
import { IState } from '../../../state';
import { ActivatedRoute } from '@angular/router';
import { ReportsEndpoints } from '../../../services/api-endpoints/endpoints';
import { HEADER_DEFINITIONS } from '../../../common/header/header-definitions';
import { GetDataButtonLabels } from '../../../common/buttons/add-data-button/add.data.buttons';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrl: './report-details.component.scss'
})
export class ReportDetailsComponent {
  reportData!: IReportDetails;
  private subscription!: Subscription;

  headerDefinition = HEADER_DEFINITIONS.reportDetails;
  raportFileButtonLabel = GetDataButtonLabels.GetReportFile;

  constructor(private dataService: DataService, private store: Store<IState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscription = this.route.paramMap.subscribe(params => {
      const reportId = params.get('id');
      if (reportId) {
        this.dataService.fetch<IReportDetails>(`${ReportsEndpoints.Report}/${reportId}`)
          .subscribe(response => {
            this.reportData = response;
          });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDownloadReportClick(event: any): void {
    console.log('creating file');
  }
}
