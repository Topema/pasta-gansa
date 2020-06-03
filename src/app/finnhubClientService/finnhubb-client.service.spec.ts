import { TestBed } from '@angular/core/testing';

import { FinnhubbClientService } from './finnhubb-client.service';

describe('FinnhubbClientService', () => {
  let service: FinnhubbClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinnhubbClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
