import { Component, inject, OnInit } from '@angular/core';
import { Footer } from "../../componentes/footer/footer";
import { Mascotas } from '../../servicios/mascotas';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../../servicios/users';
import { Session } from '../../servicios/session';
import { Navbar } from "../../componentes/navbar/navbar";
import { Notificacionesysolitud } from '../../servicios/notificacionesysolitud';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-vermascota',
  imports: [Footer, Navbar,DatePipe],
  templateUrl: './vermascota.html',
  styleUrls: ['./vermascota.scss']
})
export class Vermascota implements OnInit {
  notificacionesService = inject(Notificacionesysolitud);
  sesionService = inject(Session);
  userid: string | null = this.sesionService.getUid();
  notificacion: any = {};
  solicitante: any = {};
   vacunas: any[] = [];
  mascota: any = {};
  duenio: any = {};
  logeado: boolean = false;
  esvet: boolean = true;
  router = inject(Router);
  userService = inject(Users);
  mensaje: string = '';
  constructor(
    private route: ActivatedRoute,
    private mascotaService: Mascotas,

  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.cargarMascota(id);
      this.estaLogeado();
      this.esVeterinario(id);
    });

  }

  async cargarMascota(id: string) {
    try {
      this.mascota = await this.mascotaService.getMascotaById(id);
    
    this.duenio = await this.userService.getUserporid(this.mascota.idduenio);
 
if(this.userid !== null) {
this.solicitante = await this.userService.getUserporid(this.userid);
  
}

    } catch (error) {
      console.error('Error cargando mascota:', error);
    }
  }


 estaLogeado() {
  this.logeado = this.sesionService.isLoggedIn();

  
  
 
}


esVeterinario(idusuario: string ) {
  if (idusuario) {
    this.mascotaService.esvet(idusuario).then(esvet => {
      this.esvet = esvet;
      console.log("Es veterinario:", esvet);
    }).catch(err => console.error(err));
  } else {
    console.error("Error: userid is null");
  }
}
  cerrarSesion() {

    this.router.navigate(['']);
  }


  async solicitar() {


    if (this.solicitante.nombre) {
      this.mensaje = `${this.solicitante.nombre} con email ${this.solicitante.email} quiere ser veterinario de ${this.mascota.nombre}`;
    } else {
      this.mensaje = `${this.solicitante.email} quiere ser veterinario de ${this.mascota.nombre}`;
    }

    this.notificacion = {
      contenido: this.mensaje,
      idsolicitante: this.solicitante.uid,
      idmascota: this.mascota.idmascota,
      mascota: this.mascota.nombre,
      tipo:'2'
    };
    this.notificacionesService.addNotificacion(this.mascota.idduenio, this.notificacion)
      .then(() => {
        alert('Solicitud enviada');
      })
      .catch(err => alert('Error al enviar solicitud ' + err));

  }

} 