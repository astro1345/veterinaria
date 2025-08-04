import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Perfilmascota } from './perfilmascota';

describe('Perfilmascota', () => {
  let component: Perfilmascota;
  let fixture: ComponentFixture<Perfilmascota>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Perfilmascota]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Perfilmascota);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
