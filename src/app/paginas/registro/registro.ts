import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Autenticacion } from '../../servicios/autenticacion';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.scss'
})
export class Registro {
router = inject(Router);
 FormBuilder = inject(FormBuilder);
  authService = inject(Autenticacion);
  registerForm = this.FormBuilder.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    tipo: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
registrar() {
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    return;
  }

  const { email, password, nombre, tipo} = this.registerForm.value;
  this.authService
    .registrarUsuario(email!, password!,nombre!,tipo!) 
    .then(() => {
    
      this.router.navigate(['']);
    })
    .catch((error) => {
      alert('Error al registrar: ' + error.message);
    });
}


}


