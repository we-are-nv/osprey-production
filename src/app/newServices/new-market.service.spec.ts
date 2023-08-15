import { TestBed } from '@angular/core/testing';

import { NewMarketService } from './new-market.service';

describe('NewMarketService', () => {
  let service: NewMarketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewMarketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
