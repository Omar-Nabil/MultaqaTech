import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomMeetingsComponent } from './zoom-meetings.component';

describe('ZoomMeetingsComponent', () => {
  let component: ZoomMeetingsComponent;
  let fixture: ComponentFixture<ZoomMeetingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZoomMeetingsComponent]
    });
    fixture = TestBed.createComponent(ZoomMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
