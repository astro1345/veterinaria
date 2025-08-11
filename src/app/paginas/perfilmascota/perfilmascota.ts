import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Mascotas } from '../../servicios/mascotas';
import { Mascotaform } from "../../componentes/mascotaform/mascotaform";
import { CommonModule, DatePipe, NgIf } from '@angular/common'; 
import { Navbar } from '../../componentes/navbar/navbar';
import { Footer } from '../../componentes/footer/footer';

@Component({
  selector: 'app-perfilmascota',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    Footer,
    Mascotaform,
    DatePipe,
    RouterLink,
    NgIf 
  ],
  templateUrl: './perfilmascota.html',
  styleUrl: './perfilmascota.scss'
})

export class Perfilmascota implements OnInit {
  mascota: any = {};
  editando: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private mascotaService: Mascotas
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.cargarMascota(id);
    });
  }

  async cargarMascota(id: string) {
  try {
    this.mascota = await this.mascotaService.getMascotaById(id);
    console.log('Mascota cargada:', this.mascota); // Verifica en consola
  } catch (error) {
    console.error('Error cargando mascota:', error);
  }
}

  toggleEdicion() {
    this.editando = !this.editando;
  }

  guardarMascota(mascotaActualizada: any) {
  console.log('Intentando guardar:', mascotaActualizada); // Para depuración
  
  if (!mascotaActualizada.idmascota) {
    alert('Error: No se encontró ID de la mascota');
    return;
  }

  this.mascotaService.updateMascota(mascotaActualizada)
    .then(() => {
      console.log('Mascota actualizada con éxito');
      this.cargarMascota(mascotaActualizada.idmascota);
      this.editando = false;
    })
    .catch(error => {
      console.error('Error al actualizar:', error);
      alert('Error al guardar los cambios');
    });
}
}
