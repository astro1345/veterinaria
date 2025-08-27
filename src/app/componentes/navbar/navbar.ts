import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Mascotas } from '../../servicios/mascotas';
import { Session } from '../../servicios/session';
import { Autenticacion } from '../../servicios/autenticacion';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule,],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  sesionService = inject(Session);
  uid: string | null = this.sesionService.getUid();
  mascotaService = inject(Mascotas);
  authService = inject(Autenticacion);
  mascotas: any[] = [];
  router = inject(Router);
  constructor() {
    this.verificarsession();
    this.getMascotas();
  }
 verificarsession() {
    this.uid = this.sesionService.getUid();
    if (!this.uid) {
      alert('INICIA SESION PARA CONTINUAR');
      this.router.navigate(['']);
    }
  }
  getMascotas() {
    this.mascotaService.getMascotas().subscribe((data: any) => {
      this.mascotas = data;
    });
  }

  cerrarSesion() {
    this.authService
      .cerrarSesion()
      .then(() => {
        alert('Sesión cerrada');
        this.sesionService.clearUid();
        this.router.navigate(['']);
      })
      .catch((error) => {
        alert('Error al cerrar sesión: ' + error.message);
      });
  }
}
