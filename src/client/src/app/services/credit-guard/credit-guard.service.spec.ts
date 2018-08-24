import { TestBed, inject } from '@angular/core/testing';

import { CreditGuardService } from './credit-guard.service';

describe('CreditGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreditGuardService]
    });
  });

  it('should be created', inject([CreditGuardService], (service: CreditGuardService) => {
    expect(service).toBeTruthy();
  }));
});
