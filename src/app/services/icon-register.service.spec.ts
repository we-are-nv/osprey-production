import { TestBed } from '@angular/core/testing';

import { IconRegisterService } from './icon-register.service';

describe('IconRegisterService', () => {
  let service: IconRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IconRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
