import { TestBed } from '@angular/core/testing';

import { ZoomsService } from './zooms.service';

describe('ZoomsService', () => {
  let service: ZoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
