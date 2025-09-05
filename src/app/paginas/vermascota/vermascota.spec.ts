import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vermascota } from './vermascota';

describe('Vermascota', () => {
  let component: Vermascota;
  let fixture: ComponentFixture<Vermascota>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vermascota]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vermascota);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
