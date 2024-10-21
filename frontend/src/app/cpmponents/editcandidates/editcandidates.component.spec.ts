import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcandidatesComponent } from './editcandidates.component';

describe('EditcandidatesComponent', () => {
  let component: EditcandidatesComponent;
  let fixture: ComponentFixture<EditcandidatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditcandidatesComponent]
    });
    fixture = TestBed.createComponent(EditcandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
