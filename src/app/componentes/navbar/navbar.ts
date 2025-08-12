import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Mascotas } from '../../servicios/mascotas';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  mascotaService = inject(Mascotas);
  mascotas: any[] = [];

  constructor() {
    this.getMascotas();
  }

  getMascotas() {
    this.mascotaService.getMascotas().subscribe((data: any) => {
      this.mascotas = data;
    });
  }
}
