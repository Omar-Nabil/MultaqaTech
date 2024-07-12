import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedCourcesComponent } from './completed-cources.component';

describe('CompletedCourcesComponent', () => {
  let component: CompletedCourcesComponent;
  let fixture: ComponentFixture<CompletedCourcesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletedCourcesComponent]
    });
    fixture = TestBed.createComponent(CompletedCourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
