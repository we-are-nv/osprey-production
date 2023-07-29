import { TestBed } from '@angular/core/testing';

import { NavloadService } from './navload.service';

describe('NavloadService', () => {
  let service: NavloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
