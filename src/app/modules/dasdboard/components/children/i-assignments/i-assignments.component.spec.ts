import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IAssignmentsComponent } from './i-assignments.component';

describe('IAssignmentsComponent', () => {
  let component: IAssignmentsComponent;
  let fixture: ComponentFixture<IAssignmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IAssignmentsComponent]
    });
    fixture = TestBed.createComponent(IAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
