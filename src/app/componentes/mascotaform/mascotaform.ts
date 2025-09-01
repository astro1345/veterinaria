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
    idmascota: [''], 
    nombre: ['', Validators.required],
    raza: ['', Validators.required],
    fechanac: ['', Validators.required],
    foto: [''],
    edad: ['']  
  });
    }
    ngOnInit() {
  this.mascotaForm.get('fechanac')?.valueChanges.subscribe(fecha => {
    const edad = this.calcularEdad(fecha);
    this.mascotaForm.get('edad')?.setValue(edad, { emitEvent: false });
  });
}

calcularEdad(fechaNacimiento: string | Date): string {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);

  let años = hoy.getFullYear() - nacimiento.getFullYear();
  let meses = hoy.getMonth() - nacimiento.getMonth();
  const dias = hoy.getDate() - nacimiento.getDate();

  if (meses < 0 || (meses === 0 && dias < 0)) {
    años--;
    meses += 12;
  }
  if (dias < 0) {
    meses--;
  }

  if (años > 0) {
    return `${años} año${años > 1 ? 's' : ''}`;
  } else {
    return `${meses <= 0 ? 0 : meses} mes${meses > 1 ? 'es' : ''}`;
  }
}



    ngOnChanges() {
  if (this.mascota) {
    this.esEdicion = true;
    this.mascotaForm.patchValue(this.mascota);
    const edad = this.calcularEdad(this.mascota.fechanac);
    this.mascotaForm.get('edad')?.setValue(edad);
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


