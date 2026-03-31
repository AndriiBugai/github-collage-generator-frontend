import { TestBed } from '@angular/core/testing';

import { CollageApiService } from './collage-api.service';

describe('CollageApiService', () => {
  let service: CollageApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollageApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
