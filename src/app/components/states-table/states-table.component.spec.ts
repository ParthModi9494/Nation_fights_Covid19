import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesTableComponent } from './states-table.component';

describe('StatesTableComponent', () => {
  let component: StatesTableComponent;
  let fixture: ComponentFixture<StatesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
