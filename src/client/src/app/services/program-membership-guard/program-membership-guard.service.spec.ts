import { TestBed, inject } from '@angular/core/testing';

import { ProgramMembershipGuardService } from './program-membership-guard.service';

describe('ProgramMembershipGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgramMembershipGuardService]
    });
  });

  it('should be created', inject([ProgramMembershipGuardService], (service: ProgramMembershipGuardService) => {
    expect(service).toBeTruthy();
  }));
});
