import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingscategoriesComponent } from './meetingscategories.component';

describe('MeetingscategoriesComponent', () => {
  let component: MeetingscategoriesComponent;
  let fixture: ComponentFixture<MeetingscategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingscategoriesComponent]
    });
    fixture = TestBed.createComponent(MeetingscategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
