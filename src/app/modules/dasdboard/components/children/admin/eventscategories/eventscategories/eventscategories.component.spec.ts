import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventscategoriesComponent } from './eventscategories.component';

describe('EventscategoriesComponent', () => {
  let component: EventscategoriesComponent;
  let fixture: ComponentFixture<EventscategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventscategoriesComponent]
    });
    fixture = TestBed.createComponent(EventscategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
