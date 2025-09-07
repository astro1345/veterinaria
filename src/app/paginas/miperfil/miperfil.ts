import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Navbar } from "../../componentes/navbar/navbar";
import { Footer } from '../../componentes/footer/footer';
import { Users } from '../../servicios/users';
import { Session } from '../../servicios/session';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-miperfil',
  standalone: true,
  imports: [ Navbar, Footer, ReactiveFormsModule],
  templateUrl: './miperfil.html',
  styleUrl: './miperfil.scss'
})
export class Miperfil {
  private fb = inject(FormBuilder);
  private userService = inject(Users);
  private sesionService = inject(Session);
  private router = inject(Router);

  pacientes: any[] = [];
  uid: string | null = this.sesionService.getUid();
  tipoUsuario: string = "2"; // 1 dueño, 2 veterinario

  perfilForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: [{ value: '', disabled: true }],
    telefono: ['', [Validators.minLength(8)]],
    tipo: [''],
    clinica: [''],
    experiencia: [0, [Validators.min(0)]],
  });


  constructor() {

    if (!this.uid) {
      this.router.navigate(['/login']);
      return;
    }
    this.getUser(this.uid);
  }

  async getUser(uid: string) {
    


    try {
      const data: any = await this.userService.getUserporid(uid);
      if (data) {

        this.tipoUsuario = data.tipo;
        this.perfilForm.patchValue({
          nombre: data.nombre ?? '',
          email: data.email ?? '',
          telefono: data.telefono ?? '',
          clinica: data.clinica ?? '',
          experiencia: data.experiencia ?? 0,
        });


      }
    } catch (e) {
      console.error('Error cargando Perfil:', e);
    }
  }

  async onSubmit() {
  // Si el formulario es inválido, marcar campos como tocados
  if (this.perfilForm.invalid) {
    this.perfilForm.markAllAsTouched();
    return;
  }

  // Preparar los datos a guardar
  const perfilActualizado = {
    uid: this.uid,
    nombre: this.perfilForm.value.nombre,
    telefono: this.perfilForm.value.telefono,
    tipo: this.tipoUsuario, // Modo dueño o veterinario
    clinica: this.perfilForm.value.clinica,
    experiencia: this.perfilForm.value.experiencia,
  };

  try {
    await this.userService.updateUser(perfilActualizado);
    alert('Perfil actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    alert('Ocurrió un error al guardar los cambios');
  }
}


  onToggleTipo(event: Event) {
    const input = event.target as HTMLInputElement;
    this.tipoUsuario = input.checked ? '2' : '1';
  }
}
