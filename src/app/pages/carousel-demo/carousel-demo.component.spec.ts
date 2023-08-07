import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselDemoComponent } from './carousel-demo.component';

describe('CarouselDemoComponent', () => {
  let component: CarouselDemoComponent;
  let fixture: ComponentFixture<CarouselDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselDemoComponent]
    });
    fixture = TestBed.createComponent(CarouselDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
