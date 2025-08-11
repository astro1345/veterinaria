import { Component, inject } from '@angular/core';
import { Navbar } from "../../componentes/navbar/navbar";
import { Footer } from "../../componentes/footer/footer";
import { RouterLink, RouterOutlet } from '@angular/router';
import { Mascotas } from '../../servicios/mascotas';
import { CommonModule, JsonPipe } from '@angular/common';
import { Mascotaform } from '../../componentes/mascotaform/mascotaform';  

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [Navbar, Footer, RouterLink, RouterOutlet, JsonPipe, CommonModule, Mascotaform],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss'
})

export class Inicio {
  mascotaService = inject(Mascotas);
  mascotas: any[] = [];
  mostrarModal = false;

  constructor() {
    this.getMascotas();
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  agregarMascota(mascota: any) {
  this.mascotaService.addMascota(mascota).then((mascotaConId) => {
    this.getMascotas(); // Esto actualizará la lista con el ID incluido
    this.cerrarModal();
  });
}

  eliminarMascota(uuid: string) {
    if (confirm('¿Estás seguro de que quieres eliminar esta mascota?')) {
      this.mascotaService.deleteMascota(uuid).then(() => {
        this.getMascotas();
      });
    }
  }

  getMascotas() {
    this.mascotaService.getMascotas().subscribe((data: any) => {
      this.mascotas = data;
    });
  }
}