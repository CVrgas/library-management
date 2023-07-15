import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineAlertComponent } from './offline-alert.component';

describe('OfflineAlertComponent', () => {
  let component: OfflineAlertComponent;
  let fixture: ComponentFixture<OfflineAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfflineAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfflineAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
