import { TestBed } from '@angular/core/testing';

import { DataProiderService } from './data-proider.service';

describe('DataProiderService', () => {
  let service: DataProiderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataProiderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
