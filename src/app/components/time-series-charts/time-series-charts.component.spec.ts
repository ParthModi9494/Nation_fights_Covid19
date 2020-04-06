import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSeriesChartsComponent } from './time-series-charts.component';

describe('TimeSeriesChartsComponent', () => {
  let component: TimeSeriesChartsComponent;
  let fixture: ComponentFixture<TimeSeriesChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSeriesChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSeriesChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
