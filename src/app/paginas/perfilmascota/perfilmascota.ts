import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mascotas } from '../../servicios/mascotas';
import { Mascotaform } from "../../componentes/mascotaform/mascotaform";
import { CommonModule, DatePipe } from '@angular/common';
import { Navbar } from '../../componentes/navbar/navbar';
import { Footer } from '../../componentes/footer/footer';
import { VacunaService } from '../../servicios/vacuna'; 

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-perfilmascota',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    Footer,
    Mascotaform,
    DatePipe,
    ReactiveFormsModule,
    
    
  ],
  templateUrl: './perfilmascota.html',
  styleUrl: './perfilmascota.scss'
})
export class Perfilmascota implements OnInit {
  mascota: any = {};
  vacunas: any[] = [];
  vacunaForm: FormGroup;
  mostrarModalVacuna = false;
  editando: boolean = false;
  mostrarModal: boolean = false;


  constructor(
    
    private route: ActivatedRoute,
    private mascotaService: Mascotas,
    private vacunaService: VacunaService,
     private fb: FormBuilder
  )
   {
    this.vacunaForm = this.fb.group({
      id: [null], 
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      fecha: ['', Validators.required],
      cantidad: ['', Validators.required],
      periodo: ['',Validators.required] ,
      notas: ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.cargarMascota(id);
      this.cargarVacunas(id);
    });
  }

  async cargarMascota(id: string) {
    try {
      this.mascota = await this.mascotaService.getMascotaById(id);
      console.log('Mascota cargada:', this.mascota);
    } catch (error) {
      console.error('Error cargando mascota:', error);
    }
  }

  cargarVacunas(id: string) {
    this.vacunaService.getVacunas(id).subscribe(data => {
      this.vacunas = data;
    });
  }

  toggleEdicion() {
    this.editando = !this.editando;
  }


  guardarMascota(mascotaActualizada: any) {
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



abrirFormularioVacuna(vacuna: any = null) {
    if (vacuna) {
      // Carga datos en el formulario para editar
      this.vacunaForm.setValue({
        id: vacuna.id,
        nombre: vacuna.nombre || '',
        tipo: vacuna.tipo || '',
        fecha: vacuna.fecha ? vacuna.fecha.substring(0,10) : '', // formato YYYY-MM-DD
        cantidad: vacuna.cantidad || '',
        periodo: vacuna.periodo || '',
        notas: vacuna.notas || ''
      });
    } else {
      this.vacunaForm.reset();

    }
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

  if (vacunaData.id) {
    this.vacunaService.updateVacuna(this.mascota.idmascota, vacunaData)
      .then(() => {
        this.cerrarModalVacuna();
      });
  } else {
    this.vacunaService.addVacuna(this.mascota.idmascota, vacunaData)
      .then(() => {
        this.cerrarModalVacuna();
      })
      .catch(err => alert('Error agregando vacuna: ' + err));
  }
}


  borrarVacuna(mascota: any, vacuna: any) {


        if (confirm('¿Estás seguro de que quieres eliminar esta vacuna?')) {
      this.vacunaService.deleteVacuna(mascota.idmascota, vacuna.id);
    }
   
  }
}