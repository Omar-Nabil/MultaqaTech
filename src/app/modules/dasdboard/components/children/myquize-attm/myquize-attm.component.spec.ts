import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyquizeAttmComponent } from './myquize-attm.component';

describe('MyquizeAttmComponent', () => {
  let component: MyquizeAttmComponent;
  let fixture: ComponentFixture<MyquizeAttmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyquizeAttmComponent]
    });
    fixture = TestBed.createComponent(MyquizeAttmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
