import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportforAdminComponent } from './reportfor-admin.component';

describe('ReportforAdminComponent', () => {
  let component: ReportforAdminComponent;
  let fixture: ComponentFixture<ReportforAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportforAdminComponent]
    });
    fixture = TestBed.createComponent(ReportforAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
