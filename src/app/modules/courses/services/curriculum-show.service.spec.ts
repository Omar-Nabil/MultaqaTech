import { TestBed } from '@angular/core/testing';

import { CurriculumShowService } from './curriculum-show.service';

describe('CurriculumShowService', () => {
  let service: CurriculumShowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurriculumShowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
