import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomMeetingDetailsComponent } from './zoom-meeting-details.component';

describe('ZoomMeetingDetailsComponent', () => {
  let component: ZoomMeetingDetailsComponent;
  let fixture: ComponentFixture<ZoomMeetingDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZoomMeetingDetailsComponent]
    });
    fixture = TestBed.createComponent(ZoomMeetingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
