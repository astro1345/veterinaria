import { Component, inject } from '@angular/core';
import { Footer } from '../../componentes/footer/footer';
import { Navbar } from '../../componentes/navbar/navbar';
import { Users } from '../../servicios/users';
import { Session } from '../../servicios/session';
import { Mascotas } from '../../servicios/mascotas';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pacientes',
  imports: [Footer, Navbar, RouterLink, FormsModule],
  templateUrl: './pacientes.html',
  styleUrl: './pacientes.scss'
})
export class Pacientes {
userService = inject(Users);
sesionService = inject(Session);
uid: string | null = this.sesionService.getUid();
pacientes: any[] = [];
 searchTerm: string = '';

getpacientes() {
  this.userService.getPacientes(this.uid!).then(pacientes => {
    console.log("Pacientes:", pacientes);
    this.pacientes = pacientes || [];
  }).catch(err => console.error(err));
}



  mascotaService = inject(Mascotas);
  mascotas: any[] = [];
  mostrarModal = false;

  constructor() {
    this.getMascotas();
  }



  

  eliminarMascota(uuid: string) {
    if (confirm('¿Estás seguro de que quieres eliminar esta mascota?')) {
      this.mascotaService.deleteMascota(uuid).then(() => {
        this.getMascotas();
      });
    }
  }

  getMascotas() {
   this.mascotaService.getMascotasPorPacientes(this.sesionService.getUid()!)
  .subscribe(mascotas => {
    console.log("Mascotas en tiempo real:", mascotas);
    this.mascotas = mascotas;
  });
  }

get mascotasFiltradas() {
    if (!this.searchTerm) return this.mascotas;
    const term = this.searchTerm.toLowerCase();
    return this.mascotas.filter(m =>
      m.nombre.toLowerCase().includes(term) ||
      m.raza?.toLowerCase().includes(term)
    );
  }

}
