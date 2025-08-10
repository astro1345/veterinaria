import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() guardarMascota = new EventEmitter<any>();
  @Output() cerrarModal = new EventEmitter<void>();

  mascotaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.mascotaForm = this.fb.group({
      nombre: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
      raza: ['', Validators.required],
      fechanac: ['', Validators.required],
      foto: ['']
    });
  }

  onSubmit() {
    if (this.mascotaForm.valid) {
      this.guardarMascota.emit(this.mascotaForm.value);
      this.mascotaForm.reset();
      this.cerrarModal.emit();
    }
  }

  onCancel() {
    this.cerrarModal.emit();
  }
}