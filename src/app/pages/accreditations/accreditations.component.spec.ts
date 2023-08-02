import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditationsComponent } from './accreditations.component';

describe('AccreditationsComponent', () => {
  let component: AccreditationsComponent;
  let fixture: ComponentFixture<AccreditationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccreditationsComponent]
    });
    fixture = TestBed.createComponent(AccreditationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
