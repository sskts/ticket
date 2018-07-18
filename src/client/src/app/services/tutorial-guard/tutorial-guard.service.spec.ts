import { TestBed, inject } from '@angular/core/testing';

import { TutorialGuardService } from './tutorial-guard.service';

describe('TutorialGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TutorialGuardService]
    });
  });

  it('should be created', inject([TutorialGuardService], (service: TutorialGuardService) => {
    expect(service).toBeTruthy();
  }));
});
