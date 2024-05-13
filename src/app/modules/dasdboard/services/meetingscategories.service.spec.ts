import { TestBed } from '@angular/core/testing';

import { MeetingscategoriesService } from './meetingscategories.service';

describe('MeetingscategoriesService', () => {
  let service: MeetingscategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetingscategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
