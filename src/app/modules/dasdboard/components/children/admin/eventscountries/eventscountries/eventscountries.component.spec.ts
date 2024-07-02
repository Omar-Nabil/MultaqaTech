import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventscountriesComponent } from './eventscountries.component';

describe('EventscountriesComponent', () => {
  let component: EventscountriesComponent;
  let fixture: ComponentFixture<EventscountriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventscountriesComponent]
    });
    fixture = TestBed.createComponent(EventscountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
