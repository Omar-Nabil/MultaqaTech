import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveCourcesComponent } from './active-cources.component';

describe('ActiveCourcesComponent', () => {
  let component: ActiveCourcesComponent;
  let fixture: ComponentFixture<ActiveCourcesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveCourcesComponent]
    });
    fixture = TestBed.createComponent(ActiveCourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
