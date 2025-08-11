import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mascotaform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './mascotaform.html',
  styleUrl: './mascotaform.scss'
})
export class Mascotaform {
  @Input() mascota: any;
  @Output() guardarMascota = new EventEmitter<any>();
  @Output() cerrarModal = new EventEmitter<void>();

  mascotaForm: FormGroup;
  esEdicion: boolean = false;

  constructor(private fb: FormBuilder) {
    this.mascotaForm = this.fb.group({
  idmascota: [''], // Asegúrate de incluir este campo
  nombre: ['', Validators.required],
  edad: ['', [Validators.required, Validators.min(0)]],
  raza: ['', Validators.required],
  fechanac: ['', Validators.required],
  foto: ['']
});
  }

  ngOnChanges() {
    if (this.mascota) {
      this.esEdicion = true;
      this.mascotaForm.patchValue(this.mascota);
    } else {
      this.esEdicion = false;
      this.mascotaForm.reset();
    }
  }

  onSubmit() {
    if (this.mascotaForm.valid) {
      this.guardarMascota.emit(this.mascotaForm.value);
      if (!this.esEdicion) {
        this.mascotaForm.reset();
      }
    }
  }

  onCancel() {
    this.cerrarModal.emit();
  }
}


