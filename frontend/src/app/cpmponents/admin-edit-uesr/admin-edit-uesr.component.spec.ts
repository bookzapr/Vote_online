import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditUesrComponent } from './admin-edit-uesr.component';

describe('AdminEditUesrComponent', () => {
  let component: AdminEditUesrComponent;
  let fixture: ComponentFixture<AdminEditUesrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEditUesrComponent]
    });
    fixture = TestBed.createComponent(AdminEditUesrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
