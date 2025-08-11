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
    } catch (error) {
      console.error('Error cargando mascota:', error);
    }
  }

  toggleEdicion() {
    this.editando = !this.editando;
  }

  guardarMascota(mascotaActualizada: any) {
    this.mascotaService.updateMascota(mascotaActualizada).then(() => {
      this.cargarMascota(mascotaActualizada.idmascota);
      this.editando = false;
    });
  }
}