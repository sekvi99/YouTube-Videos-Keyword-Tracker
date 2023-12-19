import { Component, ElementRef, ViewChild } from '@angular/core';
import { IReportDetail } from '../../../models/report/report-details';
import { GraphComponent } from '../../../generic-components/graph-component';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-video-views-chart',
  templateUrl: './video-views-chart.component.html',
  styleUrl: './video-views-chart.component.scss'
})
export class VideoViewsChartComponent extends GraphComponent<IReportDetail> {
  @ViewChild('videoChart') private chartRef!: ElementRef;

  override createChart(): void {
    const viewsData = this.data?.map(video => video.views);
    const labels = this.data?.map(video => video.channelTitle);

    const ctx = this.chartRef.nativeElement.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Wyświetlenia',
          data: viewsData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
