import { TestBed, inject } from '@angular/core/testing';

import { GoHistoryService } from './go-history.service';

describe('GoHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoHistoryService]
    });
  });

  it('should be created', inject([GoHistoryService], (service: GoHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
