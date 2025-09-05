import { Component, inject, Input, OnInit } from '@angular/core';
import { Session } from '../../servicios/session';
import { Notificacionesysolitud } from '../../servicios/notificacionesysolitud';
import { Users } from '../../servicios/users';

@Component({
  selector: 'app-notificaciones',
  imports: [],
  templateUrl: './notificaciones.html',
  styleUrl: './notificaciones.scss'
})
export class Notificaciones implements OnInit {
  userService = inject(Users);
  sesionService = inject(Session);
  userid: string | null = this.sesionService.getUid();
  notificacionesService = inject(Notificacionesysolitud);
  notificacionresp: any;


  notificaciones: any[] = [];

  ngOnInit() {
    if (this.userid) {
      this.cargarNotificaciones();
    }
  }


  cargarNotificaciones() {

    this.notificacionesService.getNotificaciones(this.userid!).subscribe(data => {
      this.notificaciones = data;
    });
  }
  borrarNotificacion(id: string) {
    this.notificacionesService.deleteNotificacion(id, this.userid!);
  }


  aceptarsolicitud(notificacion: any) {
    this.notificacionesService.deleteNotificacion(notificacion.id, this.userid!);
    this.notificacionresp = {
      contenido: 'Se ha aceptado la solicitud de ser el veterinario de ' + notificacion.mascota + '. Puedes acceder a la mascota en mis Pacientes.',
      tipo: '1'
    };
    this.notificacionesService.addNotificacion(notificacion.idsolicitante, this.notificacionresp)
      .then(() => {
        alert('Solicitud Aceptada');
      })
      .catch(err => alert('Error al enviar solicitud ' + err));

this.userService.addPaciente(notificacion.idsolicitante, notificacion.idmascota)
  .then(() => console.log("Paciente usr " + notificacion.idsolicitante + " agregado " + notificacion.idmascota + " correctamente"))
  .catch(err => console.error("Error al agregar paciente:", err));

  this.userService.addVet(notificacion.idmascota, notificacion.idsolicitante)
  .then(() => console.log("Mascota " + notificacion.idmascotae + " agregado " + notificacion.idsolicitante + " correctamente"))
  .catch(err => console.error("Error al agregar veterinario:", err));

  }

  rechazarSolicitud(notificacion: any) {
    this.notificacionesService.deleteNotificacion(notificacion.id, this.userid!);


    this.notificacionresp = {
      contenido: 'Se ha negado la solicitud de ser el veterinario de ' + notificacion.mascota,
      tipo: '1'
    };
    this.notificacionesService.addNotificacion(notificacion.idsolicitante, this.notificacionresp)
      .then(() => {
        alert('Solicitud Rechazada');
      })
      .catch(err => alert('Error al enviar solicitud ' + err));



  }
}

