import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mascotaform } from './mascotaform';

describe('Mascotaform', () => {
  let component: Mascotaform;
  let fixture: ComponentFixture<Mascotaform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mascotaform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mascotaform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
