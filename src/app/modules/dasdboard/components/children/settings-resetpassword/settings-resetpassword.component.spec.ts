import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsResetpasswordComponent } from './settings-resetpassword.component';

describe('SettingsResetpasswordComponent', () => {
  let component: SettingsResetpasswordComponent;
  let fixture: ComponentFixture<SettingsResetpasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsResetpasswordComponent]
    });
    fixture = TestBed.createComponent(SettingsResetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
