import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Mascotas } from '../../servicios/mascotas';
import { Session } from '../../servicios/session';
import { Autenticacion } from '../../servicios/autenticacion';
import { Users } from '../../servicios/users';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule,],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  sesionService = inject(Session);
  userservice = inject(Users);
  uid: string | null = this.sesionService.getUid();
  tipo: String | null = "";
  mascotaService = inject(Mascotas);
  authService = inject(Autenticacion);
  mascotas: any[] = [];
  router = inject(Router);
  constructor() {
    this.verificarsession();
    this.getMascotas();
  }
  verificarsession() {

    if (!this.uid) {
      alert('INICIA SESION PARA CONTINUAR');
      this.router.navigate(['']);
    } else {
      this.userservice.gettipoUsuario(this.uid).then(tipo => {
        this.tipo = tipo;

      }).catch(error => {

      });
    }
  }
  getMascotas() {
    this.mascotaService.getMascotas().subscribe((data: any) => {
      this.mascotas = data;
    });
  }
  verificarTipo() {



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
