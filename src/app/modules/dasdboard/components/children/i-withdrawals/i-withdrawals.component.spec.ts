import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IWithdrawalsComponent } from './i-withdrawals.component';

describe('IWithdrawalsComponent', () => {
  let component: IWithdrawalsComponent;
  let fixture: ComponentFixture<IWithdrawalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IWithdrawalsComponent]
    });
    fixture = TestBed.createComponent(IWithdrawalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
