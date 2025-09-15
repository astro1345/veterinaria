import { Component, inject, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Examenes } from '../../servicios/examenes';

@Component({
  selector: 'app-moduloexamenes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

  ],
  templateUrl: './moduloexamenes.html',
  styleUrl: './moduloexamenes.scss'
})

export class Moduloexamenes {
  @Input() idMascota: string = '';
  @Input() esDuenio: boolean = false;
  @Input() correopersona: string = '';
  mostrarModalExamen = false;
  mostrarModalForm = false;
  examenSeleccionado: any = {};
mostrarModalConfirm = false;

  examenForm: FormGroup;
  examenes: any[] = []; // ahora usamos observable de Firestore


  private examenService = inject(Examenes);
  private fb = inject(FormBuilder);

  constructor() {
    this.examenForm = this.fb.group({
      titulo: ['', Validators.required],
      fecha: ['', Validators.required],
      descripcion: [''],
      autor: [''],
      links: this.fb.array([])
    });
  }
  ngOnChanges(changes: SimpleChanges) {

    this.cargarExamenes();

  }
  get links(): FormArray {
    return this.examenForm.get('links') as FormArray;
  }

  agregarLink(link: any = { nombre: '', url: '' }) {
    this.links.push(this.fb.group({
      nombre: [link.nombre, Validators.required],
      url: [link.url, Validators.required]
    }));
  }

  eliminarLink(index: number) {
    this.links.removeAt(index);
  }

  cargarExamenes() {
    this.examenService.getExamenes(this.idMascota).subscribe(data => {
      this.examenes = data;
    });
  }

abrirFormularioExamen(examen: any = null) {
  this.links.clear();

  if (examen) {
    this.examenSeleccionado = examen; // <-- importante
    this.examenForm.patchValue({
      titulo: examen.titulo,
      autor: examen.autor,
      fecha: examen.fecha,
      descripcion: examen.descripcion
    });
    examen.links?.forEach((link: any) => this.agregarLink(link));
  } else {
    this.examenSeleccionado = {}; // <-- nuevo examen
    this.examenForm.reset();
    this.agregarLink();
  }

  this.mostrarModalForm = true;
}

  cerrarFormularioExamen() {
    this.mostrarModalForm = false;
  }

 async guardarExamen() {
  if (this.examenForm.valid) {
    const examenData = { ...this.examenForm.value };

    if (!this.examenSeleccionado?.id) {
      examenData.autor = this.correopersona;
      await this.examenService.addExamen(this.idMascota, examenData);
    } else {
      examenData.id = this.examenSeleccionado.id;
      await this.examenService.updateExamen(this.idMascota, examenData);
    }

    this.cerrarFormularioExamen();
  } else {
    this.examenForm.markAllAsTouched();
  }
}

  abrirModalExamen(examen: any) {
    this.examenSeleccionado = examen;
    this.mostrarModalExamen = true;
  }

  cerrarModalExamen() {
    this.mostrarModalExamen = false;
    this.examenSeleccionado = {}; // Limpiar selección al cerrar
  }

  async eliminarExamen(examenId: string) {
      this.mostrarModalConfirm = false;
    try {
      await this.examenService.deleteExamen(this.idMascota, examenId);
    } catch (error) {
      console.error('Error eliminando examen:', error);
    }
  }
confirmarEliminacion(examen: any) {
  this.examenSeleccionado = examen;
  this.mostrarModalConfirm = true;
}
cancelarEliminacion() {
  this.examenSeleccionado = null;
  this.mostrarModalConfirm = false;
}

}