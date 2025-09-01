import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Qrmodal } from './qrmodal';

describe('Qrmodal', () => {
  let component: Qrmodal;
  let fixture: ComponentFixture<Qrmodal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Qrmodal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Qrmodal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
