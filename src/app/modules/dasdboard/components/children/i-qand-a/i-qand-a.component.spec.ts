import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IQandAComponent } from './i-qand-a.component';

describe('IQandAComponent', () => {
  let component: IQandAComponent;
  let fixture: ComponentFixture<IQandAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IQandAComponent]
    });
    fixture = TestBed.createComponent(IQandAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
