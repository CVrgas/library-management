import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SBookdetailComponent } from './small-bookdetail.component';

describe('SmallBookdetailComponent', () => {
  let component: SBookdetailComponent;
  let fixture: ComponentFixture<SBookdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SBookdetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SBookdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
