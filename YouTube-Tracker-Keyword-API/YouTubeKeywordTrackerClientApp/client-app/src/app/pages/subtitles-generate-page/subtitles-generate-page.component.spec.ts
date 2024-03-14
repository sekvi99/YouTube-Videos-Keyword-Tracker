import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtitlesGeneratePageComponent } from './subtitles-generate-page.component';

describe('SubtitlesGeneratePageComponent', () => {
  let component: SubtitlesGeneratePageComponent;
  let fixture: ComponentFixture<SubtitlesGeneratePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubtitlesGeneratePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubtitlesGeneratePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
