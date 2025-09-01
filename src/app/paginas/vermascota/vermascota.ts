import { Component, inject, OnInit } from '@angular/core';
import { Footer } from "../../componentes/footer/footer";
import { Mascotas } from '../../servicios/mascotas';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../../servicios/users';
import { Session } from '../../servicios/session';
import { Navbar } from "../../componentes/navbar/navbar";


@Component({
  selector: 'app-vermascota',
  imports: [Footer, Navbar],
  templateUrl: './vermascota.html',
  styleUrls: ['./vermascota.scss']
})
export class Vermascota implements OnInit {
  mascota: any = {};
  duenio: any = {};
  logeado: boolean = false;
  router = inject(Router);
 private userService = inject(Users);
   private session = inject(Session);
  constructor(
        private route: ActivatedRoute,
        private mascotaService: Mascotas,

  )
    {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.cargarMascota(id);
     this.estaLogeado();
    });
     this.cargarDuenio();
  }

  async cargarMascota(id: string) {
    try {
      this.mascota = await this.mascotaService.getMascotaById(id);
      console.log('Mascota cargada:', this.mascota);
    } catch (error) {
      console.error('Error cargando mascota:', error);
    }
  }

async cargarDuenio() {
        try {
      this.duenio = await this.userService.getUserporid("vxQwREpv90SMAmmCgqBlrioVuYo2");
      console.log('Duenio cargado:', this.duenio);
    } catch (error) {
      console.error('Error cargando duenio:', error);
    }
  }

  estaLogeado() {
   this.logeado = this.session.isLoggedIn();
  }

cerrarSesion() {
  
        this.router.navigate(['']);
      }


  solicitar() {
  }

}