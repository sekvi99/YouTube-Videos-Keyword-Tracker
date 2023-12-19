import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoViewsChartComponent } from './video-views-chart.component';

describe('VideoViewsChartComponent', () => {
  let component: VideoViewsChartComponent;
  let fixture: ComponentFixture<VideoViewsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoViewsChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoViewsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
