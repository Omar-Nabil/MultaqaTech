import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IMystudentsComponent } from './i-mystudents.component';

describe('IMystudentsComponent', () => {
  let component: IMystudentsComponent;
  let fixture: ComponentFixture<IMystudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IMystudentsComponent]
    });
    fixture = TestBed.createComponent(IMystudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
