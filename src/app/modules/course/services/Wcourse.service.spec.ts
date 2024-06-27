/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WcourseService } from './Wcourse.service';

describe('Service: Wcourse', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WcourseService]
    });
  });

  it('should ...', inject([WcourseService], (service: WcourseService) => {
    expect(service).toBeTruthy();
  }));
});
