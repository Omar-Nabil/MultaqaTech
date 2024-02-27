import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IAnnouncementsComponent } from './i-announcements.component';

describe('IAnnouncementsComponent', () => {
  let component: IAnnouncementsComponent;
  let fixture: ComponentFixture<IAnnouncementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IAnnouncementsComponent]
    });
    fixture = TestBed.createComponent(IAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
