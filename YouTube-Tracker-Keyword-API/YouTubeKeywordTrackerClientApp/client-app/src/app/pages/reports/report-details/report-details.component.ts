import { Component, ViewChild } from '@angular/core';
import { Observable, Subscription, BehaviorSubject, switchMap, finalize } from 'rxjs';
import { IReportDetail, IReportDetails } from '../../../models/report/report-details';
import { DataService } from '../../../services/data.service';
import { Store } from '@ngrx/store';
import { IState } from '../../../state';
import { ActivatedRoute } from '@angular/router';
import { ReportsEndpoints } from '../../../services/api-endpoints/endpoints';
import { HEADER_DEFINITIONS } from '../../../common/header/header-definitions';
import { GetDataButtonLabels } from '../../../common/buttons/add-data-button/add.data.buttons';
import { PdfPreviewComponent } from '../../../common/pdf-preview/pdf-preview.component';
import { IReportFile } from '../../../models/report/report-file';
import { ToastService } from '../../../services/toast.service';
import { FileMessages } from '../../../models/toast/toast-messages';
import { REPORT_READOUTS_COLUMNS_DEFINITION } from '../../../common/table/columns-definition';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrl: './report-details.component.scss'
})
export class ReportDetailsComponent {
  private isFetchingFileSubject = new BehaviorSubject<boolean>(false);
  isFetchingFile$ = this.isFetchingFileSubject.asObservable();
  
  reportData!: IReportDetails;
  private subscription!: Subscription;

  headerDefinition = HEADER_DEFINITIONS.reportDetails;
  raportFileButtonLabel = GetDataButtonLabels.GetReportFile;
  reportReadoutsColumns = REPORT_READOUTS_COLUMNS_DEFINITION;

  @ViewChild(PdfPreviewComponent, { static: true }) fileDialog!: PdfPreviewComponent;

  constructor(private dataService: DataService, private store: Store<IState>, private route: ActivatedRoute, private toastService: ToastService) {}

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
    this.isFetchingFileSubject.next(true);
    this.dataService.fetch<IReportFile>(`${ReportsEndpoints.ReportFile}/${this.reportData.fileId}`)
    .subscribe({
      next: (response) => {
        this.fileDialog.openDialog(response.fileContent);
        this.isFetchingFileSubject.next(false);
      },
      error: () => {
        this.toastService.error(FileMessages.FetchError);
        this.isFetchingFileSubject.next(false);
      }
    })
  }

  onVideoOpenClick(video: IReportDetail): void {
    window.open(video.videoUrl, '_blank');
  }
}
