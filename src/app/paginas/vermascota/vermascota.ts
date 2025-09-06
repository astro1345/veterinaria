import { Component, inject, OnInit } from '@angular/core';
import { Footer } from "../../componentes/footer/footer";
import { Mascotas } from '../../servicios/mascotas';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../../servicios/users';
import { Session } from '../../servicios/session';
import { Navbar } from "../../componentes/navbar/navbar";
import { Notificacionesysolitud } from '../../servicios/notificacionesysolitud';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VacunaService } from '../../servicios/vacuna';

@Component({
  selector: 'app-vermascota',
  standalone: true,
  imports: [Footer, Navbar, DatePipe, CommonModule, ReactiveFormsModule],
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

  // 🔹 Nuevo
  vacunaForm: FormGroup;
  mostrarModalVacuna = false;

  constructor(
    private route: ActivatedRoute,
    private mascotaService: Mascotas,
    private fb: FormBuilder,
    private vacunaService: VacunaService
  ) { 
    // Inicializamos el formulario
    this.vacunaForm = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      fecha: ['', Validators.required],
      cantidad: ['', Validators.required],
      periodo: ['', Validators.required],
      notas: [''],
      agregadoPor: [''] 
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.cargarMascota(id);
      this.estaLogeado();
      this.esVeterinario(id);
      this.cargarVacunas(id);
    });
  }

  async cargarMascota(id: string) {
    try {
      this.mascota = await this.mascotaService.getMascotaById(id);
      this.duenio = await this.userService.getUserporid(this.mascota.idduenio);

      if (this.userid !== null) {
        this.solicitante = await this.userService.getUserporid(this.userid);
      }
    } catch (error) {
      console.error('Error cargando mascota:', error);
    }
  }

  cargarVacunas(id: string) {
    this.vacunaService.getVacunas(id).subscribe(data => {
      this.vacunas = data;
    });
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

  // 🔹 Métodos para vacunas SOLO agregar
  abrirFormularioVacuna() {
    this.vacunaForm.reset();
    this.mostrarModalVacuna = true;
    document.body.style.overflow = 'hidden';
  }

  cerrarModalVacuna() {
    this.mostrarModalVacuna = false;
    document.body.style.overflow = '';
  }

  guardarVacuna() {
    if (this.vacunaForm.invalid) {
      this.vacunaForm.markAllAsTouched();
      return;
    }

    const vacunaData = this.vacunaForm.value;
    this.vacunaService.addVacuna(this.mascota.idmascota, vacunaData)
      .then(() => {
        this.cerrarModalVacuna();
      })
      .catch(err => alert('Error agregando vacuna: ' + err));
  }

}