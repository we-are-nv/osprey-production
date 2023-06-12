import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInfoPageComponent } from './general-info-page.component';

describe('GeneralInfoPageComponent', () => {
  let component: GeneralInfoPageComponent;
  let fixture: ComponentFixture<GeneralInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralInfoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
