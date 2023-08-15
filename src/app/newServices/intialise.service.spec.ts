import { TestBed } from '@angular/core/testing';

import { IntialiseService } from './intialise.service';

describe('IntialiseService', () => {
  let service: IntialiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntialiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
