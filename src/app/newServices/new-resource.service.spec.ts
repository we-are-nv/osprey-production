import { TestBed } from '@angular/core/testing';

import { NewResourceService } from './new-resource.service';

describe('NewResourceService', () => {
  let service: NewResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
