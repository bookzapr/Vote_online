import { TestBed } from '@angular/core/testing';

import { AddcandidatesService } from './addcandidates.service';

describe('AddcandidatesService', () => {
  let service: AddcandidatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddcandidatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
