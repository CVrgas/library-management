import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingBackonlineComponent } from './floating-backonline.component';

describe('FloatingBackonlineComponent', () => {
  let component: FloatingBackonlineComponent;
  let fixture: ComponentFixture<FloatingBackonlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatingBackonlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatingBackonlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
