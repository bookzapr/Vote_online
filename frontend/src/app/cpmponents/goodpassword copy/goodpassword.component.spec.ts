import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodpasswordComponent } from './goodpassword.component';

describe('GoodpasswordComponent', () => {
  let component: GoodpasswordComponent;
  let fixture: ComponentFixture<GoodpasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoodpasswordComponent]
    });
    fixture = TestBed.createComponent(GoodpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
